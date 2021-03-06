const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const clientInviteRouter = require('./routes/clientInvite.router');
const bookableItemRouter = require('./routes/bookableItem.router');
/* const fetchClientsRouter = require('./routes/fetchClients.router'); */
const fetchNameRouter = require('./routes/nameRouter.router');
const categoryRouter = require('./routes/category.router');
const photosRouter = require('./routes/photos.router')
const clientsRouter = require('./routes/clients.router');
const linkItem = require('./routes/linkItem.router');
const companyNameRouter = require('./routes/companyName.router');
const fetchSideBySide = require('./routes/fetchSideBySide.router');
const clientDetailItemRouter = require('./routes/clientDetailItem.router');
const renterRouter = require('./routes/renter.router');
const clientItems =require('./routes/clientItems.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/bookableItem', bookableItemRouter)
app.use('/api/user', userRouter);
app.use('/admin/invite', clientInviteRouter);
/* app.use('/clients', fetchClientsRouter); */
app.use('/bookableItemNames', fetchNameRouter);
app.use('/categoryList', categoryRouter);
app.use('/api/photos', photosRouter)
app.use('/clients', clientsRouter);
app.use('/categoryInput', linkItem);
app.use('/companyNames', companyNameRouter);
app.use('/sidebyside', fetchSideBySide);
app.use('/api/client/bookableItem', clientDetailItemRouter);
app.use('/api/renter', renterRouter);
app.use('/viewBookableItem', clientItems);



// Serve static files
app.use(express.static('build'));
app.use(express.static('public'));
// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
