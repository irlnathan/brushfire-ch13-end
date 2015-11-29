/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorial
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchTutorials: function(req, res) {

    var tutorials = [{
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 1,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 2,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 3
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 3,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 4,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 1
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 5,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 6,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 2
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 7,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 8,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 9,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 10,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }];

    console.log('skip: ', req.param('skip'));


    return res.json({
      options: {
        totalTutorials: 30,
        updatedTutorials: tutorials
      }
    });
  },

  browseTutorials: function(req, res) {

    var tutorials = [{
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 1,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 2,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 3
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 3,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 4,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 1
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 5,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 6,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 2
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 7,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 8,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 9,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 10,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }];

    console.log('skip: ', req.param('skip'));

    return res.json({
      options: {
        totalTutorials: 30,
        updatedTutorials: tutorials
      }
    });
  },

  // myRating: function(req, res) {

  //   return res.json({
  //     myRating: null
  //   });
  // },

  rateTutorial: function(req, res) {

    // Find the currently authenticated user
    User.findOne({
      id: req.session.userId
    })
    .exec(function(err, currentUser){
      if (err) return res.negotiate(err);
      if (!currentUser) return res.notFound();

      // Find the tutorial being rated
      Tutorial.findOne({
        id: +req.param('id')
      })
      .exec(function(err, foundTutorial){
        if (err) return res.negotiate(err);
        if (!foundTutorial) return res.notFound();

        // Find the rating, if any, of the tutorial from the currently logged in user.
        Rating.findOne({
          byUser: currentUser.id,
          byTutorial: foundTutorial.id
        }).exec(function(err, foundRating){
          if (err) return res.negotiate(err);

          // If the currently authenticated user-agent (user) has previously rated this tutorial
          // update it with the new rating.
          if (foundRating) {

            Rating.update({
              id: foundRating.id
            }).set({
              stars: req.param('stars')
            }).exec(function(err, updatedRating){
              if (err) return res.negotiate(err);
              if (!updatedRating) return res.notFound();

              // Re-Find the tutorial whose being rated to get the latest
              Tutorial.findOne({
                id: req.param('id')
              })
              .populate('ratings')
              .exec(function(err, foundTutorialAfterUpdate){
                if (err) return res.negotiate(err);
                if (!foundTutorialAfterUpdate) return res.notFound();

                return res.json({
                  averageRating: MathService.calculateAverage({ratings: foundTutorialAfterUpdate.ratings})
                });
              });
            });

          // If the currently authenticated user-agent (user) has not already rated this tutorial
          // create it with the new rating.
          } else {
            Rating.create({
              stars: req.param('stars'),
              byUser: currentUser.id,
              byTutorial: foundTutorial.id
            }).exec(function(err, createdRating){
              if (err) return res.negotiate(err);
              if (!createdRating) return res.notFound();

              // Re-Find the tutorial whose being rated to get the latest
              Tutorial.findOne({
                id: req.param('id')
              })
              .populate('ratings')
              .exec(function(err, foundTutorialAfterUpdate){
                if (err) return res.negotiate(err);
                if (!foundTutorialAfterUpdate) return res.notFound();

                return res.json({
                  averageRating: MathService.calculateAverage({ratings: foundTutorialAfterUpdate.ratings})
                });
              });
            });
          }
        });
      });
    });
  },

  averageRating: function(req, res) {
    return res.json({
      averageRating: 3
    });
  },

  createTutorial: function(req, res) {

    /*
     __   __    _ _    _      _   _          
     \ \ / /_ _| (_)__| |__ _| |_(_)___ _ _  
      \ V / _` | | / _` / _` |  _| / _ \ ' \ 
       \_/\__,_|_|_\__,_\__,_|\__|_\___/_||_|
                                         
    */
    
    if (!_.isString(req.param('title'))) {
      return res.badRequest();
    }

    if (!_.isString(req.param('description'))) {
      return res.badRequest();
    }

    // Find the user that's adding a tutorial
    User.findOne({
      id: req.session.userId
    })
    .exec(function(err, foundUser){
      if (err) return res.negotiate;
      if (!foundUser) return res.notFound();

      // Create the new tutorial in the tutorial model
      Tutorial.create({
        title: req.param('title'),
        description: req.param('description'),
        owner: foundUser.id,
        videoOrder: [],
      })
      .exec(function(err, createdTutorial){
        if (err) return res.negotiate(err);

        // return the new tutorial id
        return res.json({id: createdTutorial.id});
      });
    });
  },

  updateTutorial: function(req, res) {

    /*
     __   __    _ _    _      _   _          
     \ \ / /_ _| (_)__| |__ _| |_(_)___ _ _  
      \ V / _` | | / _` / _` |  _| / _ \ ' \ 
       \_/\__,_|_|_\__,_\__,_|\__|_\___/_||_|
                                         
    */

    // Validate parameters
    if (!_.isString(req.param('title'))) {
      return res.badRequest();
    }

    if (!_.isString(req.param('description'))) {
      return res.badRequest();
    }

    // Update the tutorial coercing the incoming id from a string to an integer using the unary `+` 
    Tutorial.update({
      id: +req.param('id')
    }).set({
      title: req.param('title'),
      description: req.param('description')
    }).exec(function (err) {
      if (err) return res.negotiate(err);

      return res.ok();
    });
  },

  addVideo: function(req, res) {

    /*
     __   __    _ _    _      _   _          
     \ \ / /_ _| (_)__| |__ _| |_(_)___ _ _  
      \ V / _` | | / _` / _` |  _| / _ \ ' \ 
       \_/\__,_|_|_\__,_\__,_|\__|_\___/_||_|
                                         
    */
   
    if (!_.isNumber(req.param('hours')) || !_.isNumber(req.param('minutes')) || !_.isNumber(req.param('seconds'))) {
      return res.badRequest();
    }
    if (!_.isString(req.param('src')) || !_.isString(req.param('title'))) {
      return res.badRequest();
    }

    // Look up the tutorial record.
    Tutorial.findOne({
      id: +req.param('tutorialId')
    }).exec(function (err, foundTutorial){
      if (err) return res.negotiate(err);
      if (!foundTutorial) return res.notFound();

      // Create the video record.
      Video.create({
        tutorialAssoc: foundTutorial.id,
        title: req.param('title'),
        src: req.param('src'),
        lengthInSeconds: req.param('hours') * 60 * 60 + req.param('minutes') * 60 + req.param('seconds')
      }).exec(function (err, createdVideo) {
        if (err) return res.negotiate(err);

        // Modify the `videoOrder` array embedded in our tutorial to reflect the new video.
        // (We always add new videos to the bottom of the list)
        foundTutorial.videoOrder.push(createdVideo.id);

        foundTutorial.save(function (err){
          if (err) return res.negotiate(err);

          return res.ok();
        });
      });
    });
  },


  updateVideo: function(req, res) {

    /*
     __   __    _ _    _      _   _          
     \ \ / /_ _| (_)__| |__ _| |_(_)___ _ _  
      \ V / _` | | / _` / _` |  _| / _ \ ' \ 
       \_/\__,_|_|_\__,_\__,_|\__|_\___/_||_|
                                         
    */

    if (!_.isString(req.param('title'))) {
      return res.badRequest();
    }

    if (!_.isString(req.param('src'))) {
      return res.badRequest();
    }
   
    // Coerce the hours, minutes, seconds parameter to integers
    var hours = +req.param('hours');
    var minutes = +req.param('minutes');
    var seconds = +req.param('seconds');

    // Calculate the total seconds of the video and store that value as lengthInSeconds
    var convertedToSeconds = hours * 60 * 60 + minutes * 60 + seconds;

    // Update the video 
    Video.update({
      id: +req.param('id')
    }).set({
      title: req.param('title'),
      src: req.param('src'),
      lengthInSeconds: convertedToSeconds
    }).exec(function (err, updatedUser){
      if (err) return res.negotiate(err);
      if (!updatedUser) return res.notFound();

      return res.ok();
    });
  },

  deleteTutorial: function(req, res) {
   
    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne({id: req.session.userId}).exec(function(err, foundUser){
      if (err) {
        return res.negotiate(err);
      }

      if (!foundUser) {
        return res.notFound();
      }

      // Return the username of the user using the userId of the session.
      return res.json({username: foundUser.username});
      
    });
  },

  removeVideo: function(req, res) {

      return res.ok();
  },

  showVideo: function(req, res) {

    // Find the video to play
    Video.findOne({
      id: +req.param('id')
    }).exec(function (err, foundVideo){

      // If not logged in
      if (!req.session.userId) {
        return res.view('show-video', {
          me: null,
          video: foundVideo,
          tutorialId: req.param('tutorialId')
        });
      }

      // If logged in...
      User.findOne({
        id: +req.session.userId
      }).exec(function (err, foundUser) {
        if (err) {
          return res.negotiate(err);
        }

        if (!foundUser) {
          sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
          return res.view('show-video', {
            me: null,
            video: foundVideo,
            tutorialId: req.param('tutorialId')
          });
        }

        return res.view('show-video', {
          me: {
            username: foundUser.username,
            gravatarURL: foundUser.gravatarURL,
            admin: foundUser.admin
          },
          video: foundVideo,
          tutorialId: req.param('tutorialId')
        });
      });
    });
  }
};