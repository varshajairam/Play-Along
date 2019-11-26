create table complaint_status_enum(
	id int primary key not null auto_increment,
    status varchar(45) not null
);

insert into complaint_status_enum values(1, "New");
insert into complaint_status_enum values(2, "In-Progress");
insert into complaint_status_enum values(3, "Closed");

alter table complaints
add constraint `fk_complaints_complaint_status_enum` foreign key (status) references complaint_status_enum(id);