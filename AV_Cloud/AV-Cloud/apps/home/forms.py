# -*- encoding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import TextAreaField, PasswordField , SubmitField, SelectField
from wtforms.validators import InputRequired, Email, DataRequired

## Settings


class UpdateSettingsForm(FlaskForm):
    firstname = TextAreaField('firstname'     , id='firstname_create')
    lastname = TextAreaField('lastname'     , id='last_create')
    phonenumber = TextAreaField('phonenumber'     , id='phonenumber_create')
    dob = TextAreaField('dob'     , id='dob')
    gender = SelectField('gender'     , id='gender', choices=[('', 'Select Gender'), ('female', 'Female'), ('male', 'Male')])
    city = TextAreaField('city'     , id='city')
    zip = TextAreaField('zip'     , id='zip')
    address = TextAreaField('address'     , id='address')
    houseno = TextAreaField('houseno', id='houseno')
    saveall = SubmitField('saveall')


class DashboardForm(FlaskForm):
    source = TextAreaField('source', id='source')
    destination = TextAreaField('destination', id='destination')
    cartype = SelectField('cartype', id='cartype', choices=[('', 'View car types'), ('Sedan', 'Sedan'), ('SUV', 'SUV'), ('Limousine', 'Limousine')])
    book = SubmitField('book')

"""class ReloadAmountForm(FlaskForm):    
    amount"""