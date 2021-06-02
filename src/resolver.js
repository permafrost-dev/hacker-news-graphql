import _ from 'lodash';
const { find, filter } = _;

const topStoryIds = [ 27370026, 27371553, 27369752, 27370030 ];

const topStories = [
    {
      "by" : "DavidWilkinson",
      "descendants" : 413,
      "id" : 27370026,
      "kids" : [ 27370311, 27372023, 27372215, 27370406, 27370983, 27370847, 27370758, 27370293, 27372909, 27372022, 27370313, 27370374, 27370790, 27372773, 27371859, 27370445, 27372873, 27370201, 27370784, 27370793, 27371962, 27371512, 27370917, 27370550, 27370766, 27370394, 27371058, 27372203, 27371763, 27372065, 27372419, 27370524, 27371745, 27370542, 27372613, 27372944, 27370443, 27372507, 27370930, 27371005, 27370573, 27372013, 27371204, 27372246, 27371595, 27372208, 27371617, 27370236, 27372404, 27371334, 27370867, 27370826, 27371771, 27370419, 27371622, 27370238, 27371351, 27371296, 27370613, 27370904, 27370277, 27370608, 27370397, 27370276 ],
      "score" : 1040,
      "time" : 1622648682,
      "title" : "Stack Overflow sold to Prosus for $1.8B",
      "type" : "story",
      "url" : "https://www.wsj.com/articles/software-developer-community-stack-overflow-sold-to-tech-giant-prosus-for-1-8-billion-11622648400"
    },
    {
      "by" : "mikesabbagh",
      "descendants" : 62,
      "id" : 27371553,
      "kids" : [ 27371769, 27371759, 27372016, 27372010, 27371840, 27371729, 27372664, 27372040, 27371598, 27371606, 27371736, 27371661 ],
      "score" : 136,
      "time" : 1622655156,
      "title" : "Amazon warehouse injuries '80% higher' than competitors, report claims",
      "type" : "story",
      "url" : "https://www.bbc.com/news/technology-57332390"
    },
    {
      "by" : "tlochhead",
      "descendants" : 73,
      "id" : 27369752,
      "kids" : [ 27370888, 27370436, 27371061, 27370527, 27371703, 27371823, 27370750, 27370825, 27370254, 27371079, 27372159, 27370217, 27370637, 27372302, 27371687, 27371482, 27371260, 27371534, 27371253, 27370618 ],
      "score" : 111,
      "time" : 1622647368,
      "title" : "Microsoft's low-code strategy paints a target on UIPath and other RPA companies",
      "type" : "story",
      "url" : "https://www.infoq.com/articles/cloud-vendors-low-code/"
    },
    {
      "by" : "Hooke",
      "descendants" : 16,
      "id" : 27370030,
      "kids" : [ 27371359, 27371267, 27370869, 27370175, 27371830, 27371451, 27371801, 27371494, 27370961, 27370844 ],
      "score" : 70,
      "time" : 1622648706,
      "title" : "Corpus Clock",
      "type" : "story",
      "url" : "https://en.wikipedia.org/wiki/Corpus_Clock"
    },
];

const authors = [
  { id: 1, firstName: "Tom", lastName: "Coleman" },
  { id: 2, firstName: "Sashko", lastName: "Stubailo" },
  { id: 3, firstName: "Mikhail", lastName: "Novikov" },
]
const posts = [
  { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
  { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 },
  { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
  { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 },
]

export default {
  Query: {
    posts: () => posts,
    authors(_, { first }) {
        return authors.slice(0, first);
    },
    stories(_, { first }) {
        const ids = topStoryIds.slice(0, first);
        const result = [];
        ids.forEach(id => result.push(find(topStories, { id })));
        
        return result;
    },
    author: (_, { id }) => find(authors, { id }),
  },
  Post: {
    author(parent) {
      return find(authors, { id: parent.authorId })
    }
    //author: (_, { authorId }) => find(authors, { authorId }),
  },
  Mutation: {
    createPost: (_, newPost) => {
      // console.log("new post",newPost.post.id);
      posts.push(newPost.post)
      // console.log("posts",posts);
      let result = {
        success: true,
      }
      return result
    },
  },
}
