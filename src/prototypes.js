export function User(id, name, lastName) {
	this.id = id;
	this.name = name;
	this.lastName = lastName;
}

User.prototype.getFullName = function getFullName() {
	return `${this.name} ${this.lastName}`;
};

export function Admin(id, name, lastName) {
	User.call(this, id, name, lastName);

	this.isAdmin = true;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.getAdminData = function getAdminData() {
	return `${this.name} ${this.lastName} is admin`;
};
