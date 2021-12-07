# -*- encoding: utf-8 -*-
import random

from flask import jsonify, render_template, redirect, request, url_for, session
from flask_login import (
    login_manager,
    current_user,
    login_required,
    login_user,
    logout_user
)

from apps import db, login_manager
from apps.authentication import blueprint
from apps.authentication.forms import LoginForm, CreateAccountForm
from apps.authentication.models import User, Car

from apps.authentication.util import verify_pass

login_manager.session_protection = "strong"

@blueprint.route('/')
def route_default():
    return redirect(url_for('authentication_blueprint.login'))


## Login & Registration

@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    login_form = LoginForm(request.form)
    if 'login' in request.form:
        session.permanent = False
        # read form data
        username = request.form['username']
        password = request.form['password']

        # Locate user
        user = User.query.filter_by(username=username).first()

        # Check the password
        if user and verify_pass(password, user.password):
            login_user(user)
            return redirect(url_for('authentication_blueprint.route_default'))

        # Something (user or pass) is not ok
        return render_template('accounts/login.html', msg='Wrong user or password', form=login_form)

    if not current_user.is_authenticated:
        return render_template('accounts/login.html',
                               form=login_form)
    if current_user.role == 'admin':
        return redirect(url_for('home_blueprint.dashboardadmin'))
    elif current_user.role == 'owner':
        return redirect(url_for('home_blueprint.dashboardowner'))
    else:
        return redirect(url_for('home_blueprint.dashboard'))


@blueprint.route('/register', methods=['GET', 'POST'])
def register():
    login_form = LoginForm(request.form)
    create_account_form = CreateAccountForm(request.form)
    if 'register' in request.form:

        username = request.form['username']
        email = request.form['email']

        # Check if username exists
        user = User.query.filter_by(username=username).first()
        if user:
            return render_template('accounts/register.html',
                                   msg='Username already registered',
                                   success=False,
                                   form=create_account_form)

        # Check email exists
        user = User.query.filter_by(email=email).first()
        if user:
            return render_template('accounts/register.html',
                                   msg='Email already registered',
                                   success=False,
                                   form=create_account_form)

        # else we can create the user
        user = User(
            username=request.form['username'],
            password=request.form['password'],
            email=request.form['email'],
            role=request.form['role'],
            amount=100,
        )
        db.session.add(user)
        db.session.commit()

        if request.form['role'] == 'owner':
            car = Car(
                owner=user,
                carmodel=request.form['carmodel'],
                carNo=request.form['carNo'],
                carcolor=request.form['carcolor'],
                cartype=request.form['cartype'],
                active='false',
                roadService='No Service',
                vehicleState='Idle',
                miles=random.randint(1000, 8500)
            )
            db.session.add(car)
            db.session.commit()
        return render_template('accounts/register.html',
                               msg='User created Successfully.  <u><a href="/login">Please Login here</a></u>',
                               success=True,
                               form=create_account_form)
    else:
        return render_template('accounts/register.html', form=create_account_form)


@blueprint.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('authentication_blueprint.login'))


# Error
@login_manager.unauthorized_handler
def unauthorized_handler():
    return render_template('/page-403.html'), 403


@blueprint.errorhandler(403)
def access_forbidden(error):
    return render_template('home/page-403.html'), 403


@blueprint.errorhandler(404)
def not_found_error(error):
    return render_template('home/page-404.html'), 404


@blueprint.errorhandler(500)
def internal_error(error):
    return render_template('home/page-500.html'), 500

