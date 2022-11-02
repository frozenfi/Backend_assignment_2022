// "use strict";
// // const cats = [
// //   {
// //     id: '1',
// //     name: 'Frank',
// //     birthdate: '2010-10-30',
// //     weight: '5',
// //     owner: '1',
// //     filename: 'http://placekitten.com/400/300',
// //   },
// //   {
// //     id: '2',
// //     name: 'James',
// //     birthdate: '2015-12-25',
// //     weight: '11',
// //     owner: '2',
// //     filename: 'http://placekitten.com/400/302',
// //   },
// // ];

// // module.exports = {
// //   cats,
// // };
// const cats = [
//   {
//     id: 1,
//     name: "Frank",
//     birthdate: "2010-10-30",
//     weight: "5",
//     owner: "1",
//     filename: "http://placekitten.com/400/300",
//   },
//   {
//     id: 2,
//     name: "James",
//     birthdate: "2015-12-25",
//     weight: "11",
//     owner: "2",
//     filename: "http://placekitten.com/400/302",
//   },
//   {
//     id: 3,
//     name: "Jamy",
//     birthdate: "2014-12-25",
//     weight: "8",
//     owner: "1",
//     filename: "http://placekitten.com/400/303",
//   },
//   {
//     id: 4,
//     name: "Harnes",
//     birthdate: "2016-12-25",
//     weight: "12",
//     owner: "2",
//     filename: "http://placekitten.com/400/304",
//   },
//   {
//     id: 5,
//     name: "Rickey",
//     birthdate: "2018-02-05",
//     weight: "9",
//     owner: "1",
//     filename: "http://placekitten.com/400/305",
//   },
//   {
//     id: 6,
//     name: "Adam",
//     birthdate: "2014-12-25",
//     weight: "15",
//     owner: "1",
//     filename: "http://placekitten.com/400/306",
//   },
// ];

// module.exports = {
//   cats,
// };
"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_cat");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getCatById = async (res, catId) => {
  try {
    const [row] = await promisePool.query(
      "SELECT * FROM wop_cat WHERE cat_id = ?",
      [catId]
    );
    return row;
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllCats,
  getCatById,
};
