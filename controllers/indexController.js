const Vote = require("../models/Vote");

exports.getMainPage = async (req, res) => {
  const votes = await Vote.find()
  const currentDate = new Date();
  const endedVote = [];
  const progressingVote = [];

  const isUserLogedIn = !!req.headers.cookie;

  votes.forEach(vote => {
    if (vote.endDate <= currentDate) {
      vote.isOnVote = false;
      endedVote.push(vote);
    } else {
      progressingVote.push(vote);
    }

    vote.save();
  });

  res.render("index", { progressingVote, endedVote, isUserLogedIn });
};

{/* <div class="vote-wrapper">
<% for (let i = 0; i < votes.length; i++) { %>
  <a href="/votings/<%= votes[i]._id %>">
    <div class="vote">
      <div class="title">
        제목: <%= votes[i].title %>
      </div>
      <div class="creator">
        작성자: <%= votes[i].creator %>
      </div>
      <div class="expire-date">
        만료일:
        <%=
          votes[i].endDate.getFullYear() + "년 " +
          (votes[i].endDate.getMonth() + 1) + "월" +
          votes[i].endDate.getDate() + "일"
        %>
      </div>
      <div class="vote-status">
        <% if (votes[i].isOnVote === "true") { %>
          <div>⭕️ 투표 진행중 ⭕️</div>
        <% } else { %>
          <div>❌ 투표 마감 ❌</div>
        <% } %>
      </div>
    </div>
  </a>
<% } %>
</div>
</div> */}
