# -*- encoding: utf-8 -*-

from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, ForeignKey, Date, LargeBinary, DECIMAL
from sqlalchemy.orm import relationship
from apps import db, login_manager
from apps.authentication.util import hash_pass


class User(db.Model, UserMixin):
    __tablename__ = 'registered_users'

    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True)
    email = Column(String(255), unique=True)
    password = Column(LargeBinary)
    role = Column(String(255))
    firstname = Column(String(255))
    lastname =  Column(String(255))
    address =  Column(String(255))
    city =  Column(String(255))
    zip =  Column(String(255))
    houseno = Column(String(255))
    dob =  Column(String(255))
    gender =  Column(String(255))
    phonenumber =  Column(String(255))
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
    __tablename__ = 'rental_cars'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('registered_users.id'))
    carmodel = Column(String(255))
    carNo = Column(String(255))
    carcolor = Column(String(255))
    cartype = Column(String(255))
    active = Column(String(255))
    roadService = Column(String(255))
    vehicleState = Column(String(255))
    miles = Column(Integer)
    ride = relationship('Ride', backref='ride', lazy='dynamic', primaryjoin='Car.id == Ride.car_id')

    def __repr__(self):
        return '<Carmodel: {}'.format(self.carmodel)


class Ride(db.Model):
    __tablename__ = 'rental_rides'

    id = Column(Integer, primary_key=True)
    car_id = Column(Integer, ForeignKey('rental_cars.id'))
    source = Column(String(255))
    destination = Column(String(255))
    payment = Column(String(255))
    userId = Column(Integer)
    trip_status = Column(String(255))
    ride_date = Column(Date)
    est_amount = Column(Integer)
    rewards = Column(Integer)

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