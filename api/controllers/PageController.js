/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function(req, res) {

    if (!req.session.userId) {
      return res.view('homepage', {
        me: null
      });
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('homepage', {
        me: {
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        },
        showAddTutorialButton: true
      });
    });
  },

  logout: function(req, res) {

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        console.log('error: ', err);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('signout', {
        me: {
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  editProfile: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        console.log('error: ', err);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('edit-profile', {
        me: {
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  profile: function(req, res) {

    var FAKE_DATA = {
      frontEnd: {
        numOfTutorials: 11,
        numOfFollowers: 0,
        numOfFollowing: 0
      },
      tutorials: [{
        id: 1,
        title: 'The best of Douglas Crockford on JavaScript.',
        description: 'Understanding JavasScript the good parts.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 2,
        title: 'Understanding Angular 2.0',
        description: 'Different sides of Angular 2.0',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 3,
        title: 'Biology 101.',
        description: 'The best biology teacher on the planet.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 4,
        title: 'Dog Training.',
        description: 'A great series on getting your dog to stop biting, sit, come, and stay.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 5,
        title: 'How to play famous songs on the Ukulele.',
        description: 'You\'ll learn songs like Love me Tender, Sea of Love, and more.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 6,
        title: 'Character development 101.',
        description: 'Writing better and more interesting characters.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 7,
        title: 'Drawing Cartoons.',
        description: 'Drawing techniques for the beginning cartoonist.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 8,
        title: 'How to make whisky.',
        description: 'Distilling corn into whisky.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 9,
        title: 'How do toilets work.',
        description: 'Everything you never thought you needed to know about how toilets flush.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 10,
        title: 'Making fire.',
        description: 'Techniques for making fire without a match.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        id: 11,
        title: 'Making homemade beef jerky.',
        description: 'Everything you need to know to make some jerky.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }]
    };

    // Look up the user record for the `username` parameter
    User.findOne({
      username: req.param('username')
    }).exec(function(err, foundByUsername) {
      if (err) {
        return res.negotiate(err);
      }

      // If no user exists with the username specified in the URL,
      // show the 404 page.
      if (!foundByUsername) {
        return res.notFound();
      }

      // The logged out case
      if (!req.session.userId) {

        return res.view('profile', {
          // This is for the navigation bar
          me: null,

          // This is for profile body
          username: foundByUsername.username,
          gravatarURL: foundByUsername.gravatarURL,
          frontEnd: {
            numOfTutorials: FAKE_DATA.frontEnd.numOfTutorials,
            numOfFollowers: FAKE_DATA.frontEnd.numOfFollowers,
            numOfFollowing: FAKE_DATA.frontEnd.numOfFollowing
          },
          // This is for the list of tutorials
          tutorials: FAKE_DATA.tutorials
        });
      }

      // Otherwise the user-agent IS logged in.

      // Look up the logged-in user from the database.
      User.findOne({
          id: req.session.userId
        })
        .exec(function(err, foundUser) {
          if (err) {
            return res.negotiate(err);
          }

          if (!foundUser) {
            return res.serverError('User record from logged in user is missing?');
          }

          // We'll provide `me` as a local to the profile page view.
          // (this is so we can render the logged-in navbar state, etc.)
          var me = {
            username: foundUser.username,
            email: foundUser.email,
            gravatarURL: foundUser.gravatarURL,
            admin: foundUser.admin
          };

          // We'll provide the `isMe` flag to the profile page view
          // if the logged-in user is the same as the user whose profile we looked up earlier.
          if (req.session.userId === foundUser.id) {
            me.isMe = true;
          } else {
            me.isMe = false;
          }

          // Return me property for the nav and the remaining properties for the profile page.
          return res.view('profile', {
            me: me,
            showAddTutorialButton: true,
            username: foundUser.username,
            gravatarURL: foundUser.gravatarURL,
            frontEnd: {
              numOfTutorials: FAKE_DATA.frontEnd.numOfTutorials,
              numOfFollowers: FAKE_DATA.frontEnd.numOfFollowers,
              numOfFollowing: FAKE_DATA.frontEnd.numOfFollowing,
              followedByLoggedInUser: true
            },
            tutorials: FAKE_DATA.tutorials
          });
        }); //</ User.findOne({id: req.session.userId})

    });
  },

  profileFollower: function(req, res) {

    var FAKE_DATA = {
      frontEnd: {
        numOfTutorials: 11,
        numOfFollowers: 1,
        numOfFollowing: 1
      },
      followers: [{
        username: 'sails-in-action',
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264'
      }],
      tutorials: [{
        title: 'The best of Douglas Crockford on JavaScript.',
        description: 'Understanding JavasScript the good parts.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Understanding Angular 2.0',
        description: 'Different sides of Angular 2.0',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Biology 101.',
        description: 'The best biology teacher on the planet.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Dog Training.',
        description: 'A great series on getting your dog to stop biting, sit, come, and stay.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'How to play famous songs on the Ukulele.',
        description: 'You\'ll learn songs like Love me Tender, Sea of Love, and more.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Character development 101.',
        description: 'Writing better and more interesting characters.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Drawing Cartoons.',
        description: 'Drawing techniques for the beginning cartoonist.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'How to make whisky.',
        description: 'Distilling corn into whisky.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'How do toilets work.',
        description: 'Everything you never thought you needed to know about how toilets flush.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Making fire.',
        description: 'Techniques for making fire without a match.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Making homemade beef jerky.',
        description: 'Everything you need to know to make some jerky.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }]
    };

    User.findOne({
      username: req.param('username')
    })
    .exec(function(err, foundUser) {
      if (err) return res.negotiate(err);
      if (!foundUser) return res.notFound();

      // The logged out case
      if (!req.session.userId) {

        return res.view('profile-followers', {
          // This is for the navigation bar
          me: null,

          // This is for profile body
          username: foundUser.username,
          gravatarURL: foundUser.gravatarURL,
          frontEnd: {
            numOfTutorials: FAKE_DATA.frontEnd.numOfTutorials,
            numOfFollowers: FAKE_DATA.frontEnd.numOfFollowers,
            numOfFollowing: FAKE_DATA.frontEnd.numOfFollowing,
            followers: FAKE_DATA.followers
          },
          // This is for the list of followers
          followers: FAKE_DATA.followers
        });
      }

      // Otherwise the user-agent IS logged in.

      // Look up the logged-in user from the database.
      User.findOne({
        id: req.session.userId
      })
      .exec(function(err, loggedInUser) {
        if (err) {
          return res.negotiate(err);
        }

        if (!loggedInUser) {
          return res.serverError('User record from logged in user is missing?');
        }

        // Is the logged in user currently following the owner of this tutorial?
        var cachedFollower = _.find(FAKE_DATA.followers, function(follower) {
          return follower.id === loggedInUser.id;
        });

        // Set the display toggle (followedByLoggedInUser) based upon whether
        // the currently logged in user is following the owner of the tutorial.
        var followedByLoggedInUser = false;
        if (cachedFollower) {
          followedByLoggedInUser = true;
        }

        // We'll provide `me` as a local to the profile page view.
        // (this is so we can render the logged-in navbar state, etc.)
        var me = {
          username: loggedInUser.username,
          email: loggedInUser.email,
          gravatarURL: loggedInUser.gravatarURL,
          admin: loggedInUser.admin
        };

        // We'll provide the `isMe` flag to the profile page view
        // if the logged-in user is the same as the user whose profile we looked up earlier.
        if (req.session.userId === foundUser.id) {
          me.isMe = true;
        } else {
          me.isMe = false;
        }

        // Return me property for the nav and the remaining properties for the profile page.
        return res.view('profile-followers', {
          me: me,
          showAddTutorialButton: true,
          username: foundUser.username,
          gravatarURL: foundUser.gravatarURL,
          frontEnd: {
            numOfTutorials: FAKE_DATA.frontEnd.numOfTutorials,
            numOfFollowers: FAKE_DATA.frontEnd.numOfFollowers,
            numOfFollowing: FAKE_DATA.frontEnd.numOfFollowing,
            followedByLoggedInUser: false,
            followers: FAKE_DATA.followers
          },
          followers: FAKE_DATA.followers
        });
      }); //</ User.findOne({id: req.session.userId})
    });
  },

  profileFollowing: function(req, res) {

    var FAKE_DATA = {
      frontEnd: {
        numOfTutorials: 11,
        numOfFollowers: 1,
        numOfFollowing: 1
      },
      following: [{
        username: 'sails-in-action',
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264'
      }],
      tutorials: [{
        title: 'The best of Douglas Crockford on JavaScript.',
        description: 'Understanding JavasScript the good parts.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Understanding Angular 2.0',
        description: 'Different sides of Angular 2.0',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Biology 101.',
        description: 'The best biology teacher on the planet.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Dog Training.',
        description: 'A great series on getting your dog to stop biting, sit, come, and stay.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'How to play famous songs on the Ukulele.',
        description: 'You\'ll learn songs like Love me Tender, Sea of Love, and more.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Character development 101.',
        description: 'Writing better and more interesting characters.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Drawing Cartoons.',
        description: 'Drawing techniques for the beginning cartoonist.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'How to make whisky.',
        description: 'Distilling corn into whisky.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'How do toilets work.',
        description: 'Everything you never thought you needed to know about how toilets flush.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Making fire.',
        description: 'Techniques for making fire without a match.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }, {
        title: 'Making homemade beef jerky.',
        description: 'Everything you need to know to make some jerky.',
        owner: 'sails-in-action',
        averageRating: 3,
        created: 'a few seconds ago',
        totalTime: '1h 2m 3s'
      }]
    };


    User.findOne({
      username: req.param('username')
    })
    .exec(function(err, foundUser) {
      if (err) return res.negotiate(err);
      if (!foundUser) return res.notFound();

      // The logged out case
      if (!req.session.userId) {

        return res.view('profile-followers', {
          // This is for the navigation bar
          me: null,

          // This is for profile body
          username: foundUser.username,
          gravatarURL: foundUser.gravatarURL,
          frontEnd: {
            numOfTutorials: FAKE_DATA.frontEnd.numOfTutorials,
            numOfFollowers: FAKE_DATA.frontEnd.numOfFollowers,
            numOfFollowing: FAKE_DATA.frontEnd.numOfFollowing,
            following: FAKE_DATA.following
          },
          // This is for the list of following
          following: FAKE_DATA.following
        });
      }

      // Otherwise the user-agent IS logged in.

      // Look up the logged-in user from the database.
      User.findOne({
        id: req.session.userId
      })
      .exec(function(err, loggedInUser) {
        if (err) {
          return res.negotiate(err);
        }

        if (!loggedInUser) {
          return res.serverError('User record from logged in user is missing?');
        }

        // Is the logged in user currently following the owner of this tutorial?
        var cachedFollower = _.find(FAKE_DATA.following, function(follower) {
          return follower.id === loggedInUser.id;
        });

        // Set the display toggle (followedByLoggedInUser) based upon whether
        // the currently logged in user is following the owner of the tutorial.
        var followedByLoggedInUser = false;
        if (cachedFollower) {
          followedByLoggedInUser = true;
        }

        // We'll provide `me` as a local to the profile page view.
        // (this is so we can render the logged-in navbar state, etc.)
        var me = {
          username: loggedInUser.username,
          email: loggedInUser.email,
          gravatarURL: loggedInUser.gravatarURL,
          admin: loggedInUser.admin
        };

        // We'll provide the `isMe` flag to the profile page view
        // if the logged-in user is the same as the user whose profile we looked up earlier.
        if (req.session.userId === foundUser.id) {
          me.isMe = true;
        } else {
          me.isMe = false;
        }

        // Return me property for the nav and the remaining properties for the profile page.
        return res.view('profile-following', {
          me: me,
          showAddTutorialButton: true,
          username: foundUser.username,
          gravatarURL: foundUser.gravatarURL,
          frontEnd: {
            numOfTutorials: FAKE_DATA.frontEnd.numOfTutorials,
            numOfFollowers: FAKE_DATA.frontEnd.numOfFollowers,
            numOfFollowing: FAKE_DATA.frontEnd.numOfFollowing,
            followedByLoggedInUser: false,
            following: FAKE_DATA.following
          },
          following: FAKE_DATA.following
        });
      }); //</ User.findOne({id: req.session.userId})
    });
  },

  signin: function(req, res) {

    return res.view('signin', {
      me: null
    });
  },

  signup: function(req, res) {

    return res.view('signup', {
      me: null
    });
  },

  restoreProfile: function(req, res) {

    return res.view('restore-profile', {
      me: null
    });
  },

  administration: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {

      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      if (!user.admin) {
        return res.redirect('/');
      } else {
        return res.view('administration', {
          me: {
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          },
          showAddTutorialButton: true
        });
      }
    });
  },

  // #1
  passwordRecoveryEmail: function(req, res) {

    return res.view('./password-recovery/password-recovery-email', {
      me: null
    });
  },

  // #2
  passwordRecoveryEmailSent: function(req, res) {

    return res.view('./password-recovery/password-recovery-email-sent', {
      me: null
    });
  },

  // #3
  passwordReset: function(req, res) {

    // Get the passwordRecoveryToken and render the view
    res.view('./password-recovery/password-reset', {
      me: null,
      passwordRecoveryToken: req.param('passwordRecoveryToken')
    });

  },

  showBrowsePage: function(req, res) {

    // If not logged in set `me` property to `null` and pass tutorials to the view
    if (!req.session.userId) {
      return res.view('browse-tutorials-list', {
        me: null
      });
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('browse-tutorials-list', {
        me: {
          email: user.email,
          gravatarURL: user.gravatarURL,
          username: user.username,
          admin: user.admin
        },
        showAddTutorialButton: true
      });
    });
  },

  tutorialDetail: function(req, res) {

    Tutorial.findOne({
      id: +req.param('id')
    })
    .populate('owner')
    .populate('ratings')
    .populate('videos')
    .exec(function (err, foundTutorial){
    if (err) return res.negotiate(err);
    if (!foundTutorial) return res.notFound();

      // Find the user that created the tutorial
      User.findOne({
        id: foundTutorial.owner.id
      }).exec(function (err, foundUser){
        if (err) return res.negotiate(err);
        if (!foundUser) return res.notFound();

        // Find the rating (if any) of the currently authenticated user
        Rating.findOne({
          byUser: req.session.userId
        }).exec(function(err, foundRating){
          if (err) return res.negotiate(err);

          /*
            _____                     __                      
           |_   _| __ __ _ _ __  ___ / _| ___  _ __ _ __ ___  
             | || '__/ _` | '_ \/ __| |_ / _ \| '__| '_ ` _ \ 
             | || | | (_| | | | \__ \  _| (_) | |  | | | | | |
             |_||_|  \__,_|_| |_|___/_|  \___/|_|  |_| |_| |_|
                                                    
           */

          // Set the tutorial.owner attribute to the username of the creator of the tutorial
          foundTutorial.owner = foundUser.username;

          /**********************************************************************************
            Date Formatting
          **********************************************************************************/

          // Assign the time ago formatted date using `.getTimeAgo`
          foundTutorial.created = DatetimeService.getTimeAgo({date: foundTutorial.createdAt});
          foundTutorial.updated = DatetimeService.getTimeAgo({date: foundTutorial.updatedAt});

          /**********************************************************************************
            Rating the Tutorial
          **********************************************************************************/

          // If a rating exists by the currently authenticated user update foundTutorial.myRating
          if (!foundRating) {
            foundTutorial.myRating = null;
          } else {
            foundTutorial.myRating = foundRating.stars;
          }

          // Calculate the average of all existing ratings.
          if (foundTutorial.ratings.length === 0) {
            foundTutorial.averageRating = null;
          } else {

            // Assign the average to foundTutorial.averageRating
            foundTutorial.averageRating = MathService.calculateAverage({ratings: foundTutorial.ratings})
          }

          /************************************
           Tutorial & Video Length Formatting
          *************************************/

          // Format the total time for each video and for the tutorial as a whole.
          var totalSeconds = 0;
          _.each(foundTutorial.videos, function(video){

            // Total the number of seconds for all videos for tutorial total time
            totalSeconds = totalSeconds + video.lengthInSeconds;

            // Format the video lengthInSeconds into xh xm xs format for each video
            video.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: video.lengthInSeconds}).hoursMinutesSeconds;

            // Format the total time for the tutorial
            foundTutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;
          });

          /*
            _                               _    ___        _   
           | |    ___   __ _  __ _  ___  __| |  / _ \ _   _| |_ 
           | |   / _ \ / _` |/ _` |/ _ \/ _` | | | | | | | | __|
           | |__| (_) | (_| | (_| |  __/ (_| | | |_| | |_| | |_ 
           |_____\___/ \__, |\__, |\___|\__,_|  \___/ \__,_|\__|
                       |___/ |___/                              
           */
    
          // If not logged in set `me` property to `null` and pass the tutorial to the view
          if (!req.session.userId) {
             console.log('foundTutorial: ', foundTutorial);
            return res.view('tutorials-detail', {
              me: null,
              // stars: foundTutorial.stars,
              tutorial: foundTutorial
            });
          }

          /*
            _                               _   ___       
           | |    ___   __ _  __ _  ___  __| | |_ _|_ __  
           | |   / _ \ / _` |/ _` |/ _ \/ _` |  | || '_ \ 
           | |__| (_) | (_| | (_| |  __/ (_| |  | || | | |
           |_____\___/ \__, |\__, |\___|\__,_| |___|_| |_|
                       |___/ |___/                        
           */

          User.findOne({
            id: req.session.userId
          })
          .exec(function (err, loggedInUser) {
            if (err) {
              return res.negotiate(err);
            }

            if (!loggedInUser) {
              sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
              return res.view('tutorials-detail', {
                me: null
              });
            }

            // We'll provide `me` as a local to the profile page view.
            // (this is so we can render the logged-in navbar state, etc.)
            var me = {
              gravatarURL: loggedInUser.gravatarURL,
              username: loggedInUser.username,
              admin: loggedInUser.admin
            };

            if (loggedInUser.username === foundTutorial.owner) {
              me.isMe = true;

              return res.view('tutorials-detail', {
                me: me,
                tutorial: foundTutorial
              });

            } else {
              return res.view('tutorials-detail', {
                me: {
                  gravatarURL: loggedInUser.gravatarURL,
                  username: loggedInUser.username,
                  admin: loggedInUser.admin
                },
                tutorial: foundTutorial
              });
            }
          });
        });
      });
    });
  },

  newTutorial: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('tutorials');
      }

      return res.view('tutorials-detail-new', {
        me: {
          gravatarURL: user.gravatarURL,
          username: user.username,
          admin: user.admin
        }
      });
    });
  },

  editTutorial: function(req, res) {

    Tutorial.findOne({
      id: +req.param('id')
    }).exec(function (err, foundTutorial){
      if (err) return res.negotiate(err);
      if (!foundTutorial) return res.notFound();

      User.findOne({
        id: +req.session.userId
      }).exec(function (err, foundUser) {
        if (err) return res.negotiate(err);

        if (!foundUser) {
          sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
          return res.redirect('/tutorials');
        }

        if (foundUser.username !== foundTutorial.owner.username) {
          return res.redirect('/tutorials/'+foundTutorial.id);
        }

        return res.view('tutorials-detail-edit', {
          me: {
            gravatarURL: foundUser.gravatarURL,
            username: foundUser.username,
            admin: foundUser.admin
          },
          tutorial: {
            id: foundTutorial.id,
            title: foundTutorial.title,
            description: foundTutorial.description,
          }
        });
      });
    });
  },

  newVideo: function(req, res) {

    // Find the tutorial that will contain the added video
    Tutorial.findOne({
      id: +req.param('id')
    })
    .populate('owner')
    .populate('ratings')
    .populate('videos')
    .exec(function (err, foundTutorial){
      if (err) return res.negotiate(err);
      if (!foundTutorial) return res.notFound();

      // Find the currently authenticated user
      User.findOne({
        id: req.session.userId
      }).exec(function (err, user) {
        if (err) {
          return res.negotiate(err);
        }

        if (!user) {
          sails.log.verbose('Session refers to a user who no longer exists.');
          return res.redirect('/');
        }

        // TODO: Probably should be a policy
        if (user.username !== foundTutorial.owner.username) {

          return res.redirect('/tutorials/'+foundTutorial.id);
        }

        /*
            _____                     __                      
           |_   _| __ __ _ _ __  ___ / _| ___  _ __ _ __ ___  
             | || '__/ _` | '_ \/ __| |_ / _ \| '__| '_ ` _ \ 
             | || | | (_| | | | \__ \  _| (_) | |  | | | | | |
             |_||_|  \__,_|_| |_|___/_|  \___/|_|  |_| |_| |_|
                                                    
        */

        // Transform the `created` attribute into time ago format
        foundTutorial.created = DatetimeService.getTimeAgo({date: foundTutorial.createdAt});

        /**********************************************************************************
            Calculate the averge rating 
        **********************************************************************************/

        // Calculate the average of all existing ratings.
        if (foundTutorial.ratings.length === 0) {
          foundTutorial.averageRating = null;
        } else {

          // Assign the average to foundTutorial.averageRating
          foundTutorial.stars = MathService.calculateAverage({ratings: foundTutorial.ratings});
        }

        /************************************
          Tutorial & Video Length Formatting
        *************************************/

        // Format the total time for each video and for the tutorial as a whole.
        var totalSeconds = 0;
        _.each(foundTutorial.videos, function(video){

          // Total the number of seconds for all videos for tutorial total time
          totalSeconds = totalSeconds + video.lengthInSeconds;

          // Format the total time for the tutorial
          foundTutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;
        });

        return res.view('tutorials-detail-video-new', {
          me: {
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          },
          tutorial: {
            id: foundTutorial.id,
            title: foundTutorial.title,
            description: foundTutorial.description,
            owner: foundTutorial.owner.username,
            created: foundTutorial.created,
            totalTime: foundTutorial.totalTime,
            stars: foundTutorial.stars
          }
        });
      });
    });
  },

  editVideo: function(req, res) {

    Tutorial.findOne({
      id: +req.param('tutorialId')
    })
    .populate('videos')
    .populate('owner')
    .populate('ratings')
    .exec(function(err, foundTutorial){
      if (err) return res.negotiate(err);
      if (!foundTutorial) return res.notFound();

      User.findOne({
        id: req.session.userId
      }).exec(function (err, foundUser) {
        if (err) {
          return res.negotiate(err);
        }

        if (!foundUser) {
          sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
          return res.redirect('/');
        }

        if (foundUser.username !== foundTutorial.owner.username) {

          return res.redirect('/tutorials/'+foundTutorial.id);

        }

        /*
            _____                     __                      
           |_   _| __ __ _ _ __  ___ / _| ___  _ __ _ __ ___  
             | || '__/ _` | '_ \/ __| |_ / _ \| '__| '_ ` _ \ 
             | || | | (_| | | | \__ \  _| (_) | |  | | | | | |
             |_||_|  \__,_|_| |_|___/_|  \___/|_|  |_| |_| |_|
                                                    
        */
       
        // Transform the `created` attribute into time ago format
        foundTutorial.created = DatetimeService.getTimeAgo({date: foundTutorial.createdAt});
       
        /**********************************************************************************
            Calculate the averge rating 
        **********************************************************************************/

        // Perform Average Ratings calculation if there are ratings
        if (foundTutorial.ratings.length === 0) {
          foundTutorial.averageRating = null;
        } else {

          var sumTutorialRatings = 0;

          // Total the number of ratings for the Tutorial
          _.each(foundTutorial.ratings, function(rating){

            sumTutorialRatings = sumTutorialRatings + rating.stars;  
          });

          // Assign the average to the tutorial
          foundTutorial.averageRating = sumTutorialRatings / foundTutorial.ratings.length;
        }

        /************************************
          Tutorial & Video Length Formatting
        *************************************/

        var totalSeconds = 0;
        _.each(foundTutorial.videos, function(video){

          totalSeconds = totalSeconds + video.lengthInSeconds;
          foundTutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;
        });

        var videoToUpdate = _.find(foundTutorial.videos, function(video){
        return video.id === +req.param('id');
        });

        /*
            _____                                      
           |  __ \                                     
           | |__) |___  ___ _ __   ___  _ __  ___  ___ 
           |  _  // _ \/ __| '_ \ / _ \| '_ \/ __|/ _ \
           | | \ \  __/\__ \ |_) | (_) | | | \__ \  __/
           |_|  \_\___||___/ .__/ \___/|_| |_|___/\___|
                           | |                         
                           |_|                                             
         */

        return res.view('tutorials-detail-video-edit', {
          me: {
            username: foundUser.username,
            gravatarURL: foundUser.gravatarURL,
            admin: foundUser.admin
          },
          tutorial: {
            id: foundTutorial.id,
            title: foundTutorial.title,
            description: foundTutorial.description,
            owner: foundTutorial.owner.username,
            created: foundTutorial.created,
            totalTime: foundTutorial.totalTime,
            averageRating: foundTutorial.averageRating,
            video: {
              id: videoToUpdate.id,
              title: videoToUpdate.title,
              src: videoToUpdate.src,
              hours: DatetimeService.getHoursMinutesSeconds({totalSeconds: videoToUpdate.lengthInSeconds}).hours,
              minutes: DatetimeService.getHoursMinutesSeconds({totalSeconds: videoToUpdate.lengthInSeconds}).minutes,
              seconds: DatetimeService.getHoursMinutesSeconds({totalSeconds: videoToUpdate.lengthInSeconds}).seconds
            }
          }
        });
      });
    });
  }
};