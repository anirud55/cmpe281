# -*- encoding: utf-8 -*-

from flask_login import UserMixin
from sqlalchemy import BINARY, Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from apps import db, login_manager

from apps.authentication.util import hash_pass


class User(db.Model, UserMixin):
    __tablename__ = 'avrentallogin'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(BINARY)
    role = Column(String)
    firstname = Column(String)
    lastname =  Column(String)
    address =  Column(String)
    city =  Column(String)
    zip =  Column(String)
    houseno = Column(String)
    dob =  Column(String)
    gender =  Column(String)
    phonenumber =  Column(String)
    amount  = Column(Integer)
    car = relationship('Car', backref='owner', lazy='dynamic', primaryjoin='User.id == Car.user_id')

    def __init__(self, **kwargs):
        for property, value in kwargs.items():
            # depending on whether value is an iterable or not, we must
            # unpack it's value (when **kwargs is request.form, some values
            # will be a 1-element list)
            if hasattr(value, '__iter__') and not isinstance(value, str):
                # the ,= unpack of a singleton fails PEP8 (travis flake8 test)
                value = value[0]

            if property == 'password':
                value = hash_pass(value)  # we need bytes here (not plain str)

            setattr(self, property, value)

    def __repr__(self):
        return str(self.username)


class Car(db.Model):
    __tablename__ = 'avrentalcars'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('avrentallogin.id'))
    carmodel = Column(String)
    carNo = Column(String)
    carcolor = Column(String)
    cartype = Column(String)
    active = Column(String)
    ride = relationship('Ride', backref='ride', lazy='dynamic', primaryjoin='Car.id == Ride.car_id')

    def __repr__(self):
        return '<Carmodel: {}'.format(self.carmodel)


class Ride(db.Model):
    __tablename__ = 'avrentalrides'

    id = Column(Integer, primary_key=True)
    car_id = Column(Integer, ForeignKey('avrentalcars.id'))
    source = Column(String)
    destination = Column(String)
    payment = Column(String)
    userId = Column(Integer)
    trip_status = Column(String)
    ride_date = Column(Date)
    est_amount = Column(Integer)

    def __repr__(self):
        return '<RideDetails: {}'.format(self.source)


@login_manager.user_loader
def user_loader(id):
    return User.query.filter_by(id=id).first()


@login_manager.request_loader
def request_loader(request):
    username = request.form.get('username')
    user = User.query.filter_by(username=username).first()
    return user if user else None