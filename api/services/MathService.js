module.exports = {

  /**
   * Calculate the averageRating for 1 or more ratings 
   * 
   * @required {Dictionary} ratings   e.g.  [{ 
   *                                          stars: 3,
   *                                          byUser: 3,
   *                                          byTutorial: 1,
   *                                          id: 1,
   *                                          createdAt: '2015-11-23T19:38:00.000Z',
   *                                          updatedAt: '2015-11-23T19:38:00.000Z' 
   *                                        }]
   * 
   * @return {Integer}        e.g. 3
   */
  
  calculateAverage: function (options) {

    // Get the average of all ratings with the updated rating
    var sumTutorialRatings = 0;

    // Total the number of ratings for the Tutorial
    _.each(options.ratings, function(rating){
      sumTutorialRatings = sumTutorialRatings + rating.stars;
    });

    // Assign the average to the tutorial
    var averageRating = sumTutorialRatings / options.ratings.length;

    return averageRating;
  }
};