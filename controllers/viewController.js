const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  console.log(tours);

  // 2) Build template
  // 3) Render the template using the tour data
  res.status(200).render('overview', { title: 'All tours', tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.tourSlug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) return next(new AppError('There is no tour with that name.', 404));
  // 2) Build template
  // 2) Render template using data from 1)
  res.status(200).render('tour', { title: `${tour.name} tour`, tour });
});

exports.login = (req, res) => {
  res.status(200).render('login', { title: 'Log into your account' });
};

exports.signup = (req, res) => {
  res.status(200).render('signup', { title: 'Sign up an account' });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Your account' });
};

exports.getMyTours = catchAsync(async (req, res) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', { title: 'My tours', tours });
});

exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .render('account', { title: 'Your accout', user: updatedUser });
});
