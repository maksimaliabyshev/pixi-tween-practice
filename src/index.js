import "./styles/style.css";

import * as PIXI from "pixi.js";
import { Rectangle } from "pixi.js";

import { Assets } from "@pixi/assets";

import { assetsMap } from "./assetsMap";
import { Tank } from "./Tank";
// eslint-disable-next-line import/named
import { TweenManager } from "./Tween";

const canvas = document.getElementById("canvas");
// eslint-disable-next-line no-multi-assign
const height = (canvas.style.height = window.innerHeight);
// eslint-disable-next-line no-multi-assign
const width = (canvas.style.width = window.innerWidth);

// Приложение создаст визуализатор с использованием WebGL, если это возможно,
// с откатом к рендерингу холста. Он также настроит тикер
// и корневой этап PIXI.Container
const app = new PIXI.Application({
	height,
	width,
	backgroundColor: 0xc2c2c2,
	view: canvas,
});
window.PIXI = PIXI;
window.APP = app;

await Promise.all(
	assetsMap.sprites.map(async (sprite) => {
		Assets.add(sprite.name, sprite.url);
		const texture = await Assets.load(sprite.name);
		return texture;
	})
).then((resolved) => {
	console.log(resolved);

	const marker = new PIXI.Graphics();
	marker.beginFill(0xff0000, 1);
	marker.drawCircle(0, 0, 2);
	marker.endFill();

	const tank = new Tank();
	app.stage.addChild(tank.view);
	app.stage.addChild(marker);

	app.stage.position.set(width / 2, height / 2);

	window.TANK = tank;

	const tweenManager = new TweenManager(app.ticker);

	const moveTank = (event) => {
		const { data } = event;
		// console.log(data);
		const distanceToCenter = data.getLocalPosition(app.stage);
		const distanceToTank = data.getLocalPosition(tank.view);
		console.log("app.stage", distanceToCenter);
		console.log("tank.view", distanceToTank);

		const angle = Math.atan2(distanceToTank.y, distanceToTank.x);
		console.log("🚀 angle", angle);

		let callAmount = 2;
		const move = () => {
			callAmount -= 1;
			if (callAmount <= 0) {
				tweenManager.createTween(
					tank,
					3000,
					{ x: distanceToCenter.x, y: distanceToCenter.y },
					{
						onStart: () => tank.startTracks(),
						onFinish: () => tank.stopTracks(),
					}
				);
			}
		};
		tweenManager.createTween(
			tank,
			1000,
			{ towerDirection: angle },
			{
				onFinish: () => move(),
			}
		);
		tweenManager.createTween(
			tank,
			2000,
			{ bodyDirection: angle },
			{
				onStart: () => {
					tank.startTracks();
				},
				onFinish: () => {
					tank.stopTracks();
					move();
				},
			}
		);
	};

	app.stage.on("pointerdown", moveTank);
	app.stage.interactive = true;
	app.stage.interactiveChildren = false;
	app.stage.hitArea = new Rectangle(-400, -400, 800, 800);
});
