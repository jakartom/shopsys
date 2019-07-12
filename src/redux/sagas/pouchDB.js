import PouchDB from 'pouchdb-browser'
import { jsGetAge } from '../../components/util'
import data from './dataUpdate.json'

let db = new PouchDB("shopsys");
export async function dbInit() {
    let rt = await db.allDocs({
        include_docs: true,
    });
    if (rt.rows.length > 0) {
        for (let dd of rt.rows) {
            if (dd.doc._id.indexOf("_design") < 0)
                await db.remove(dd.doc);
        }
    }
    await db.bulkDocs(data);
}

export function getCustomer(skip, limit, queryString) {
    if (queryString) queryString = queryString.trim();
    return db.allDocs({ include_docs: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return rows;
            let rtArr;
            let cardTypeArr = [];
            rtArr = rows.reduce((rtArr, row) => {
                if (row.doc.type !== "customer" && row.doc.type !== "cardType") return rtArr;
                if (row.doc.type === "customer") {
                    if (queryString) {
                        if (row.doc.name.startsWith(queryString)) rtArr.push(row.doc);
                    }
                    else rtArr.push(row.doc);
                } else if (row.doc.type === "cardType") {
                    cardTypeArr.push(row.doc);
                }
                return rtArr;
            }, []);
            //把cardName加入返回的customer中
            let cardType = cardTypeArr.reduce((obj, type) => {
                obj[type.typeId] = type.cardName;
                return obj;
            }, {});
            rtArr = rtArr.map(doc => {
                doc.cardName = cardType[doc.cardType];
                return doc;
            })
            //排序
            rtArr.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            if (limit === 10) {
                //不是第一次fetch,需要根据skip,limit返回
                return rtArr.slice(skip, skip + limit);
            }
            return rtArr;
        })
}

export function getCustomerSexForCard(sex) {
    return db.allDocs({ include_docs: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return rows;
            let rtArr;
            let cardTypeArr = [];
            rtArr = rows.reduce((rtArr, row) => {
                if (row.doc.type !== "customer" && row.doc.type !== "cardType") return rtArr;
                if (row.doc.type === "customer") {
                    if (row.doc.sex === sex) rtArr.push(row.doc);
                } else if (row.doc.type === "cardType") {
                    cardTypeArr.push(row.doc);
                }
                return rtArr;
            }, []);
            let cardType = cardTypeArr.reduce((obj, type) => {
                obj[type.typeId] = { name: type.cardName, count: 0 };
                return obj;
            }, {});
            for (let doc of rtArr) {
                cardType[doc.cardType].count++;
            }
            let endArr = Object.keys(cardType).reduce((accu, type) => {
                accu.push({ name: cardType[type].name, value: cardType[type].count });
                return accu;
            }, []);

            return endArr;
        })
}
export function getCustomerCardForSex(card) {
    return db.allDocs({ include_docs: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return rows;
            let maleArr = [];
            let femaleArr = [];
            for (let row of rows) {
                if (row.doc.type !== "customer") continue;
                if (row.doc.cardType === card) {
                    if (row.doc.sex === "男") maleArr.push(row.doc);
                    else if (row.doc.sex === "女") femaleArr.push(row.doc);
                }
            }
            let endArr = [{ name: "男", value: maleArr.length },
            { name: "女", value: femaleArr.length }]

            return endArr;
        })
}

export function getCustomerCardForAge(card) {
    return db.allDocs({ include_docs: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return rows;
            //age:0-17
            let firstArr = [];
            //age:18-45
            let secondArr = [];
            //age:46-69
            let thirdArr = [];
            //age:>69
            let fourthArr = [];
            for (let row of rows) {
                if (row.doc.type !== "customer") continue;
                if (row.doc.cardType === card) {
                    if (jsGetAge(row.doc.birthday) <= 17) firstArr.push(row.doc);
                    else if (jsGetAge(row.doc.birthday) >= 18 && jsGetAge(row.doc.birthday) <= 45)
                        secondArr.push(row.doc);
                    else if (jsGetAge(row.doc.birthday) >= 46 && jsGetAge(row.doc.birthday) <= 69)
                        thirdArr.push(row.doc);
                    else if (jsGetAge(row.doc.birthday) > 69) fourthArr.push(row.doc);
                }
            }
            let endArr = [{ name: "0-17岁", value: firstArr.length },
            { name: "18-45岁", value: secondArr.length },
            { name: "46-69岁", value: thirdArr.length },
            { name: ">69岁", value: fourthArr.length }];
            return endArr;
        })
}

export function getCustomerAgeForCard(range) {
    return db.allDocs({ include_docs: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return rows;
            range = range * 1;
            //age:0-17
            let firstArr = [];
            //age:18-45
            let secondArr = [];
            //age:46-69
            let thirdArr = [];
            //age:>69
            let fourthArr = [];
            let cardTypeArr = [];
            for (let row of rows) {
                if (row.doc.type !== "customer" && row.doc.type !== "cardType") continue;
                if (row.doc.type === "customer") {
                    if (jsGetAge(row.doc.birthday) <= 17 && range === 0) firstArr.push(row.doc);
                    else if (range === 1 && jsGetAge(row.doc.birthday) >= 18 && jsGetAge(row.doc.birthday) <= 45)
                        secondArr.push(row.doc);
                    else if (range === 2 && jsGetAge(row.doc.birthday) >= 46 && jsGetAge(row.doc.birthday) <= 69)
                        thirdArr.push(row.doc);
                    else if (range === 3 && jsGetAge(row.doc.birthday) > 69) fourthArr.push(row.doc);
                } else if (row.doc.type === "cardType") {
                    cardTypeArr.push(row.doc);
                }
            }
            let cardType = cardTypeArr.reduce((obj, type) => {
                obj[type.typeId] = { name: type.cardName, count: 0 };
                return obj;
            }, {});
            let rtArr;
            if (range === 0) rtArr = firstArr;
            else if (range === 1) rtArr = secondArr;
            else if (range === 2) rtArr = thirdArr;
            else rtArr = fourthArr;
            for (let doc of rtArr) {
                cardType[doc.cardType].count++;
            }
            let endArr = Object.keys(cardType).reduce((accu, type) => {
                accu.push({ name: cardType[type].name, value: cardType[type].count });
                return accu;
            }, []);

            return endArr;
        })
}

export function getCustomerJoinPerMonth(range) {
    return db.allDocs({ include_docs: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return rows;
            let obj = {};
            for (let row of rows) {
                if (row.doc.type !== "customer") continue;
                if (!row.doc.joinDate) row.doc.joinDate = "_";
                else {
                    let tempArr = row.doc.joinDate.split("-");
                    row.doc.joinDate = tempArr[0] + "-" + tempArr[1];
                }
                if (!obj[row.doc.joinDate]) obj[row.doc.joinDate] = 1;
                else obj[row.doc.joinDate]++;
            }
            let xArr = Object.keys(obj).sort();
            let yArr = [];
            for (let i = 0; i < xArr.length; i++) {
                yArr[i] = obj[xArr[i]];
            }
            let endArr = [xArr, yArr];

            return endArr;
        })
}

export function editCustomer(content) {
    return db.get(content._id).then(function (doc) {
        doc.name = content.name;
        doc.cardType = content.cardType;
        doc.joinDate = content.joinDate;
        doc.birthday = content.birthday;
        doc.sex = content.sex;
        doc.city = content.city;
        return db.put(doc);
    });
}


export function deleteCustomer(customerId) {
    return db.get(customerId).then(function (doc) {
        return db.remove(doc);
    }).then(response => ({ result: response }));
}

export function getUser(name) {
    return db.allDocs({ include_docs: true, attachments: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return {};
            let rtArr = rows.filter(row => {
                if (row.doc.type !== "user") return false;
                return row.doc.username === name;
            });
            if (rtArr.length === 0) return undefined;
            if (rtArr[0].doc._attachments) {
                rtArr[0].doc.avatar = rtArr[0].doc._attachments[rtArr[0].doc.avatarFileName].data;
                delete rtArr[0].doc._attachments;
            }
            return rtArr[0].doc;
        });
}

export function getAllcardType() {
    return db.allDocs({ include_docs: true })
        .then(response => {
            let rows = response.rows;
            if (rows.length === 0) return rows;
            let rtArr;
            rtArr = rows.reduce((rtArr, row) => {
                if (row.doc.type !== "cardType") return rtArr;
                rtArr.push(row.doc);
                return rtArr;
            }, []);
            //排序
            rtArr.sort((a, b) => {
                if (a.cardName > b.cardName) return 1;
                if (a.cardName < b.cardName) return -1;
                return 0;
            });
            return rtArr;
        })
}

export function addCardType(cardName) {
    return db.allDocs({ include_docs: true })
        .then(response => {
            let maxTypeId = 0;
            let rows = response.rows;
            if (rows.length > 0) {
                for (let row of rows) {
                    if (row.doc.type === "cardType" && row.doc.typeId > maxTypeId)
                        maxTypeId = row.doc.typeId;
                }
            }
            let newCardType = {
                cardName,
                typeId: maxTypeId + 1,
                type: "cardType"
            };
            return db.post(newCardType);

        })
}

export function editCardType(id, cardName) {
    return db.get(id).then(doc => {
        doc.cardName = cardName;
        db.put(doc);
    });
}

export function addCustomer(content) {
    content.type = "customer";
    return db.post(content);
}

export function saveAvatar(id, base64Content, fileName, fileType) {
    return db.get(id).then(function (doc) {
        doc.avatarFileName = fileName;
        doc.avatarFileType = fileType;
        return db.put(doc);
    }).then(response => {
        return db.putAttachment(id, fileName, response.rev, base64Content, fileType);
    });

}