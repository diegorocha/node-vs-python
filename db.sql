create database if not exists db;
use db;

drop table if exists tasks;

create table tasks(id integer auto_increment primary key, task_key varchar(50), task_value varchar(120));

delete from tasks;

insert into tasks(task_key, task_value) value('foo', 'bar'), ('other', 'value');
