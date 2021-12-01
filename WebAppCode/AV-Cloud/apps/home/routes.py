# -*- encoding: utf-8 -*-

from apps.home import blueprint
from flask import render_template, redirect, url_for, request, session, send_file, flash
from flask_login import login_required, current_user

from jinja2 import TemplateNotFound
from apps.home.forms import UpdateSettingsForm, DashboardForm
from apps.authentication.models import User, Car, Ride
from apps import db, login_manager
import os
from datetime import date
import random
import requests, json
import re


@blueprint.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    dashboard_form = DashboardForm(request.form)
    if 'book' in request.form:
        cartype = request.form['cartype']
        car = Car.query.filter_by(cartype=cartype, active='false').first()
        user = User.query.filter_by(username=current_user.username).first()
        today = date.today()
        if (car != None):
            car.active = 'true'
            user_id = user.id
            # We need user id to fetch user old transaction details.
            print(request.form['source'])
            print(request.form['destination'])
            distance, duration, fare = calculateDistance(request.form['source'], request.form['destination'],cartype)
            print("fare", fare)
            print("duraction", duration)
            ride = Ride(
                ride=car,
                source=request.form['source'],
                destination=request.form['destination'],
                userId=user_id,
                ride_date=today,
                trip_status="Booked",
                payment=0,
                est_amount=fare
            )
            db.session.add(ride)
            db.session.commit()
            return render_template('home/dashboard.html', segment='dashboard', form=dashboard_form, car=car, est_amt=fare,
                                   est_dur=duration)
        else:
            car_type = request.form['cartype']
            return render_template('home/dashboard.html', segment='dashboard', form=dashboard_form, error=True,
                                   carType=car_type)
    else:
        return render_template('home/dashboard.html', segment='dashboard', form=dashboard_form)


def calculateDistance(source, dest,cartype):
    # Setting base price
    base_price = 2

    # enter your api key here
    api_key = 'AIzaSyAhuWEjnuSmY-N43m_5yhg4d4WU_LO084s'

    # url variable store url
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + source + "&destinations=" + dest + "&key=" + api_key

    # return response object
    r = requests.get(url)

    # return json format result
    x = r.json()

    distance = x['rows'][0]['elements'][0]['distance']['text']
    duration = x['rows'][0]['elements'][0]['duration']['text']

    distance = re.findall('\d*\.?\d+', distance)[0]

    # Converting distance in km to miles
    distance = round(float(distance) * 0.62, 2)

    # Calculating price based on base price
    fare = round(distance * base_price, 2) 

    #Fares: sedan= fare *1 , SUV =fare*1.5 ,Limousine =fare*2

    if cartype =="SUV":
        fare= round(fare*1.5)
    elif cartype =="Limousine":
        fare*=2

    return distance, duration, fare


@blueprint.route('/dashboard-admin', methods=['GET', 'POST'])
@login_required
def dashboardadmin():
    page = request.args.get('page', 1, type=int)
    page1 = request.args.get('page1', 1, type=int)

    data = Car.query.paginate(page=page, per_page=5)  # data from database
    user_data = User.query.paginate(page=page1, per_page=5)

    random_no = []
    for row in data.items:
        random_no.append(random.randint(50, 100))
    print(random_no)
    return render_template('home/dashboard-admin.html', query=data, user_query=user_data, battery=random_no, zip=zip)


@blueprint.route('/dashboard-owner', methods=['GET', 'POST'])
@login_required
def dashboardowner():
    data = Car.query.filter_by(user_id=current_user.id).all()  # data from database
    carrides_owned = []
    Amount = 0
    for i in data:
        rides = Ride.query.filter_by(car_id=i.id).all()
        carrides_owned.extend(rides)

    for i in carrides_owned:
        Amount = int(Amount) + int(i.payment)
    return render_template('home/dashboard-owner.html', query=data, carrides=carrides_owned, user=current_user,
                           amount=Amount)


@blueprint.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
    setting_form = UpdateSettingsForm(request.form)
    print(current_user.firstname)
    if 'saveall' in request.form:
        user = User.query.filter_by(username=current_user.username).first()
        if user:
            user.firstname = request.form['firstname']
            user.lastname = request.form['lastname']
            user.address = request.form['address']
            user.city = request.form['city']
            user.zip = request.form['zip']
            user.houseno = request.form['houseno']
            user.dob = request.form['dob']
            user.gender = request.form['gender']
            user.phonenumber = request.form['phonenumber']
            db.session.commit()

    return render_template('home/settings.html', form=setting_form)


@blueprint.route('/transactions', methods=['GET', 'POST'])
@login_required
def transactions():
    page = request.args.get('page2', 1, type=int)
    data = Ride.query.filter_by(userId=current_user.id).paginate(page=page, per_page=5)  # data from database
    # user_data = User.query.filter_by(username=current_user.id).first()

    return render_template('home/transactions.html', tripRecord=data, count=len(data.items), user=current_user)


@blueprint.route('/storage')
@login_required
def storage():
    print("hello")
    return render_template('home/storage.html', segment='index', contents=contents)

