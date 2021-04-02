const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT406BUwUOLUgksjp2ZU5JA_bfLjiaZVADnng&usqp=CAU',
  'https://www.cnet.com/a/img/arY9B-RgjY0blw5S-AuAmIk5-LA=/1200x630/2020/08/24/d099aab7-e826-45e5-af94-896bb04b2d10/vote-elections-2020-trump-pence-biden-harris-0656.jpg',
  'https://saportakinsta.s3.amazonaws.com/wp-content/uploads/2020/08/Vote-Your-Voice_main-Hero_1800x1012.png',
  'https://www.newcastlecolorado.org/sites/default/files/styles/full_node_primary/public/imageattachments/administration/page/3341/vote_your_voice_matters.jpg?itok=EiT2h5N3',
  'https://www.americansabroad.org/files/883/',
  'https://eccles.utah.edu/wp-content/uploads/2018/10/vote-for-blog.jpg',
  'https://s19499.pcdn.co/wp-content/uploads/2017/03/636065411486445932-684327553_vote1.jpg',
  'https://media.npr.org/assets/img/2018/09/06/gettyimages-1007970946_wide-b63fe9178fc3ed494c31073ecd9e3e1a831633f0-s800-c85.jpg',
];

exports.getRandomImage = () => images[Math.floor(Math.random() * images.length)];
