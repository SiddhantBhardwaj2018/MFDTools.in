use mfdtools;

create table roles (
	role_id BIGINT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL UNIQUE
);

create table users (
	user_id BIGINT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
	name varchar(255),
	phone varchar(255) unique,
	arn varchar(255) unique,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    role_id BIGINT NOT NULL,
	FOREIGN KEY (role_id) REFERENCES roles(role_id),
	INDEX idx_role_id (role_id)
);

insert into roles (role_id,name)
values (1,"ROLE_BASIC_USER");

insert into roles (role_id, name)
values (2,"ROLE_ADMIN");

commit;