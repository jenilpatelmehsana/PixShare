const Timeline = require("../../model/timeline");

function addToTimeline(post, user) {
    var newTimelineItem = new Timeline({
        postingDate: post.postingTime,
        postID: post._id,
        owner: user._id,
        ownerEmail: user.email
    })
    newTimelineItem.save().then((obj) => {
        // create another service that sorts data
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = addToTimeline;
/* 

--> add all posts to timeline
--> schema structure

timeline {
    postTime: Date --> (sort by date)
    postId: postID
    posterId: userID
}

*/