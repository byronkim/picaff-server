"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_entity_1 = __importDefault(require("@entity/User.entity"));
const Item_entity_1 = __importDefault(require("@entity/Item.entity"));
const TestResult_entity_1 = __importDefault(require("@entity/TestResult.entity"));
const TagItem_entity_1 = __importDefault(require("@entity/TagItem.entity"));
const Liked_entity_1 = __importDefault(require("@entity/Liked.entity"));
exports.default = {
    isCheckedUser: (target) => __awaiter(void 0, void 0, void 0, function* () {
        const userEntity = (0, typeorm_1.getRepository)(User_entity_1.default);
        const userInfo = yield userEntity.findOne({ where: { email: target } });
        if (typeof userInfo === 'undefined') {
            return false;
        }
        else {
            return true;
        }
    }),
    getUserInfo: (email, type) => __awaiter(void 0, void 0, void 0, function* () {
        const userEntity = (0, typeorm_1.getRepository)(User_entity_1.default);
        const userInfo = yield userEntity.findOne({ where: { email: email, type: type } });
        if (typeof userInfo === 'undefined') {
            throw new Error('잘못된 회원 정보입니다.');
        }
        else {
            return userInfo;
        }
    }),
    editUserInfo: (target, editInfo, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (target === 'userName') {
                yield (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .update(User_entity_1.default)
                    .set({ userName: editInfo })
                    .where({ id: id })
                    .execute();
            }
            else if (target === 'password') {
                yield (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .update(User_entity_1.default)
                    .set({ password: editInfo })
                    .where({ id: id })
                    .execute();
            }
            const userEntity = (0, typeorm_1.getRepository)(User_entity_1.default);
            const userInfo = yield userEntity.findOne({ where: { id: id } });
            if (typeof userInfo === 'undefined') {
                throw Error('잘못된 회원 정보입니다.');
            }
            else {
                return userInfo;
            }
        }
        catch (err) {
            throw new Error('다시 시도하세요.');
        }
    }),
    getTestResultInfo: (userId, testId, isNull) => __awaiter(void 0, void 0, void 0, function* () {
        const testResultEntity = (0, typeorm_1.getRepository)(TestResult_entity_1.default);
        if (isNull) {
            const testInfo = yield testResultEntity.findOne({ where: { id: testId } });
            if (typeof testInfo === 'undefined') {
                const err = '회원 정보와 설문조사 자료가 일치하지 않습니다.';
                return err;
            }
            else {
                if (testInfo.userId === null) {
                    yield (0, typeorm_1.getConnection)()
                        .createQueryBuilder()
                        .update(TestResult_entity_1.default)
                        .set({ userId: userId })
                        .where({ id: testId })
                        .execute();
                    const resultInfo = yield testResultEntity.findOne({ where: { id: testId } });
                    if (typeof resultInfo !== 'undefined') {
                        return [resultInfo];
                    }
                    else {
                        const err = '회원 정보와 설문조사 자료가 일치하지 않습니다.';
                        return err;
                    }
                }
                else {
                    const err = '회원 정보와 설문조사 자료가 일치하지 않습니다.';
                    return err;
                }
            }
        }
        else {
            //로그인중인 상태라면
            const testInfo = yield testResultEntity.find({ where: { userId: userId } });
            if (testInfo.length < 1) {
                return testInfo;
            }
            else {
                return testInfo;
            }
        }
    }),
    createUser: (email, userName, password, type) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield new User_entity_1.default();
        user.email = email;
        user.userName = userName;
        user.password = password;
        user.type = type;
        yield (0, typeorm_1.getRepository)(User_entity_1.default).save(user);
        return user;
    }),
    createOauthUser: (email, userName, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new User_entity_1.default();
        const changeEmailType = `'${email}'`;
        user.email = changeEmailType;
        user.userName = userName;
        user.password = password;
        user.type = 'OAuth';
        yield (0, typeorm_1.getRepository)(User_entity_1.default).save(user);
        return user;
    }),
    getKakaoUserInfo: (target) => __awaiter(void 0, void 0, void 0, function* () {
        const userEntity = (0, typeorm_1.getRepository)(User_entity_1.default);
        const userInfo = yield userEntity.findOne({ where: { email: target, type: 'OAuth' } });
        if (typeof userInfo === 'undefined') {
            return undefined;
        }
        else {
            return userInfo;
        }
    }),
    getGoogleUserInfo: (target) => __awaiter(void 0, void 0, void 0, function* () {
        const userEntity = (0, typeorm_1.getRepository)(User_entity_1.default);
        const userInfo = yield userEntity.findOne({ where: { email: target, type: 'OAuth' } });
        if (typeof userInfo === 'undefined') {
            return undefined;
        }
        else {
            return userInfo;
        }
    }),
    getItemInfo: (itemId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const targetItem = yield (0, typeorm_1.getRepository)(Item_entity_1.default).findOne({ where: { id: itemId } });
            if (typeof itemId === 'undefined') {
                throw new Error('정확한 정보를 입력해 주세요');
            }
            else {
                if (targetItem.type === 'coffee') {
                    const itemInfo = yield (0, typeorm_1.getRepository)(Item_entity_1.default)
                        .createQueryBuilder('item')
                        .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
                        .leftJoinAndSelect('item.tagItems', 'tagItem')
                        .leftJoinAndSelect('tagItem.tag', 'tag')
                        .where('item.id = :id', { id: itemId })
                        .getOne();
                    let isCheckLiked;
                    if (userId === null) {
                        isCheckLiked = false;
                    }
                    else {
                        const CheckIsLiked = yield (0, typeorm_1.getRepository)(Liked_entity_1.default)
                            .createQueryBuilder('liked')
                            .where('liked.userId = :userId', { userId: userId })
                            .andWhere('liked.itemId = :itemId', { itemId: itemId })
                            .getOne();
                        if (typeof CheckIsLiked === 'undefined') {
                            isCheckLiked = false;
                        }
                        else {
                            isCheckLiked = true;
                        }
                    }
                    if (typeof itemInfo !== 'undefined') {
                        const { id, itemName, itemPrice, itemDetail, type, iso, imageURL, productCharacterId, coffeeCharacterId, coffeeCharacter, tagItems, } = itemInfo;
                        const itemDetails = itemDetail.split('/');
                        const resultItemInfo = {
                            id: id,
                            itemName: itemName,
                            itemPrice: itemPrice,
                            itemDetail: {
                                title: itemDetails[0],
                                content: itemDetails.slice(1),
                            },
                            type: type,
                            imageURL: imageURL,
                            iso: iso,
                            productCharacterId: productCharacterId,
                            coffeeCharacterId: coffeeCharacterId,
                            coffeeCharacter: coffeeCharacter,
                            tag: tagItems.map((data) => {
                                return data.tag;
                            }),
                            isLiked: isCheckLiked,
                        };
                        return resultItemInfo;
                    }
                    else {
                        throw new Error('정확한 정보를 입력해 주세요');
                    }
                }
                else if (targetItem.type === 'product') {
                    const itemInfo = yield (0, typeorm_1.getRepository)(Item_entity_1.default)
                        .createQueryBuilder('item')
                        .leftJoinAndSelect('item.productCharacter', 'productCharacter')
                        .leftJoinAndSelect('item.tagItems', 'tagItem')
                        .leftJoinAndSelect('tagItem.tag', 'tag')
                        .where('item.id = :id', { id: itemId })
                        .getOne();
                    let isCheckLiked;
                    if (userId === null) {
                        isCheckLiked = false;
                    }
                    else {
                        const CheckIsLiked = yield (0, typeorm_1.getRepository)(Liked_entity_1.default)
                            .createQueryBuilder('liked')
                            .where('liked.userId = :userId', { userId: userId })
                            .andWhere('liked.itemId = :itemId', { itemId: itemId })
                            .getOne();
                        if (typeof CheckIsLiked === 'undefined') {
                            isCheckLiked = false;
                        }
                        else {
                            isCheckLiked = true;
                        }
                    }
                    if (typeof itemInfo !== 'undefined') {
                        const { id, itemName, itemPrice, itemDetail, type, imageURL, iso, productCharacterId, coffeeCharacterId, productCharacter, tagItems, } = itemInfo;
                        const itemDetails = itemDetail.split('/');
                        const resultItemInfo = {
                            id: id,
                            itemName: itemName,
                            itemPrice: itemPrice,
                            itemDetail: {
                                title: itemDetails[0],
                                content: itemDetails.slice(1),
                            },
                            type: type,
                            imageURL: imageURL,
                            iso: iso,
                            productCharacterId: productCharacterId,
                            coffeeCharacterId: coffeeCharacterId,
                            productCharacter: productCharacter,
                            tag: tagItems.map((data) => {
                                return data.tag;
                            }),
                            isLiked: isCheckLiked,
                        };
                        return resultItemInfo;
                    }
                    else {
                        throw new Error('정확한 정보를 입력해 주세요');
                    }
                }
            }
        }
        catch (_a) {
            throw new Error('정확한 정보를 입력해 주세요');
        }
    }),
    getLiked: (userId, type) => __awaiter(void 0, void 0, void 0, function* () {
        if (type === 'coffee') {
            const likedItemList = yield (0, typeorm_1.getRepository)(Item_entity_1.default)
                .createQueryBuilder('item')
                .leftJoin('item.likeds', 'liked')
                .where('item.type = :type', { type: type })
                .andWhere('liked.Userid = :userId', { userId: userId })
                .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
                .leftJoinAndSelect('item.tagItems', 'tagItem')
                .leftJoinAndSelect('tagItem.tag', 'tag')
                .getMany();
            const itemList = likedItemList.map((data) => {
                const { id, itemName, itemPrice, itemDetail, type, imageURL, iso, productCharacterId, coffeeCharacterId, coffeeCharacter, tagItems, } = data;
                const itemDetails = itemDetail.split('/');
                let itemInfo = {
                    id: id,
                    itemName: itemName,
                    itemPrice: itemPrice,
                    itemDetail: {
                        title: itemDetails[0],
                        content: itemDetails.slice(1),
                    },
                    type: type,
                    imageURL: imageURL,
                    iso: iso,
                    productCharacterId: productCharacterId,
                    coffeeCharacterId: coffeeCharacterId,
                    coffeeCharacter: coffeeCharacter,
                    tag: tagItems.map((data) => {
                        return data.tag;
                    }),
                    isLiked: true,
                };
                return itemInfo;
            });
            return itemList;
        }
        else {
            const likedItemList = yield (0, typeorm_1.getRepository)(Item_entity_1.default)
                .createQueryBuilder('item')
                .leftJoin('item.likeds', 'liked')
                .leftJoinAndSelect('item.productCharacter', 'productCharacter')
                .where('item.type = :type', { type: type })
                .andWhere('liked.Userid = :userId', { userId: userId })
                .leftJoinAndSelect('item.tagItems', 'tagItem')
                .leftJoinAndSelect('tagItem.tag', 'tag')
                .getMany();
            const itemList = likedItemList.map((data) => {
                const { id, itemName, itemPrice, itemDetail, type, imageURL, iso, productCharacterId, coffeeCharacterId, productCharacter, tagItems, } = data;
                const itemDetails = itemDetail.split('/');
                let itemInfo = {
                    id: id,
                    itemName: itemName,
                    itemPrice: itemPrice,
                    itemDetail: {
                        title: itemDetails[0],
                        content: itemDetails.slice(1),
                    },
                    type: type,
                    imageURL: imageURL,
                    iso: iso,
                    productCharacterId: productCharacterId,
                    coffeeCharacterId: coffeeCharacterId,
                    productCharacter: productCharacter,
                    tag: tagItems.map((data) => {
                        return data.tag;
                    }),
                    isLiked: true,
                };
                return itemInfo;
            });
            return itemList;
        }
    }),
    createTestInfo: (userId, coffeeType, itemType) => __awaiter(void 0, void 0, void 0, function* () {
        const testResult = yield new TestResult_entity_1.default();
        if (typeof userId === 'number') {
            testResult.userId = userId;
            testResult.coffeeTypeId = coffeeType;
            testResult.itemTypeId = itemType;
            yield (0, typeorm_1.getRepository)(TestResult_entity_1.default).save(testResult);
        }
        else {
            testResult.userId = null;
            testResult.coffeeTypeId = coffeeType;
            testResult.itemTypeId = itemType;
            yield (0, typeorm_1.getRepository)(TestResult_entity_1.default).save(testResult);
        }
        return testResult;
    }),
    getTestResultItem: (coffeeId, productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        let coffeeResult;
        let productResult;
        const coffeeInfo = yield (0, typeorm_1.getRepository)(Item_entity_1.default)
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.coffeeCharacter', 'coffeeCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .where('item.id = :id', { id: coffeeId })
            .getOne();
        let isCheckLiked;
        if (userId === null) {
            isCheckLiked = false;
        }
        else {
            const CheckIsLiked = yield (0, typeorm_1.getRepository)(Liked_entity_1.default)
                .createQueryBuilder('liked')
                .where('liked.userId = :userId', { userId: userId })
                .andWhere('liked.itemId = :itemId', { itemId: coffeeId })
                .getOne();
            if (typeof CheckIsLiked === 'undefined') {
                isCheckLiked = false;
            }
            else {
                isCheckLiked = true;
            }
        }
        if (typeof coffeeInfo !== 'undefined') {
            const { id, itemName, itemPrice, itemDetail, type, imageURL, iso, productCharacterId, coffeeCharacterId, coffeeCharacter, tagItems, } = coffeeInfo;
            const itemDetails = itemDetail.split('/');
            const resultItemInfo = {
                id: id,
                itemName: itemName,
                itemPrice: itemPrice,
                itemDetail: {
                    title: itemDetails[0],
                    content: itemDetails.slice(1),
                },
                type: type,
                imageURL: imageURL,
                iso: iso,
                productCharacterId: productCharacterId,
                coffeeCharacterId: coffeeCharacterId,
                coffeeCharacter: coffeeCharacter,
                tag: tagItems.map((data) => {
                    return data.tag;
                }),
                isLiked: isCheckLiked,
            };
            coffeeResult = resultItemInfo;
        }
        else {
            coffeeResult = {};
        }
        const productInfo = yield (0, typeorm_1.getRepository)(Item_entity_1.default)
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.productCharacter', 'productCharacter')
            .leftJoinAndSelect('item.tagItems', 'tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .where('item.id = :id', { id: productId })
            .getOne();
        if (userId === null) {
            isCheckLiked = false;
        }
        else {
            const CheckIsLiked = yield (0, typeorm_1.getRepository)(Liked_entity_1.default)
                .createQueryBuilder('liked')
                .where('liked.userId = :userId', { userId: userId })
                .andWhere('liked.itemId = :itemId', { itemId: productId })
                .getOne();
            if (typeof CheckIsLiked === 'undefined') {
                isCheckLiked = false;
            }
            else {
                isCheckLiked = true;
            }
        }
        if (typeof productInfo !== 'undefined') {
            const { id, itemName, itemPrice, itemDetail, type, imageURL, iso, productCharacterId, coffeeCharacterId, productCharacter, tagItems, } = productInfo;
            const itemDetails = itemDetail.split('/');
            const resultItemInfo = {
                id: id,
                itemName: itemName,
                itemPrice: itemPrice,
                itemDetail: {
                    title: itemDetails[0],
                    content: itemDetails.slice(1),
                },
                type: type,
                imageURL: imageURL,
                iso: iso,
                productCharacterId: productCharacterId,
                coffeeCharacterId: coffeeCharacterId,
                productCharacter: productCharacter,
                tag: tagItems.map((data) => {
                    return data.tag;
                }),
                isLiked: isCheckLiked,
            };
            productResult = resultItemInfo;
        }
        else {
            productResult = {};
        }
        return { coffeeResult: coffeeResult, productResult: productResult };
    }),
    getTagAndItemInfo: (tagId, type) => __awaiter(void 0, void 0, void 0, function* () {
        const tagAndItemInfo = yield (0, typeorm_1.getRepository)(TagItem_entity_1.default)
            .createQueryBuilder('tagItem')
            .leftJoinAndSelect('tagItem.tag', 'tag')
            .leftJoinAndSelect('tagItem.item', 'item')
            .where('tag.id = :id', { id: tagId })
            .andWhere('item.type = :type', { type: type })
            .getMany();
        return tagAndItemInfo;
    }),
};
//# sourceMappingURL=index.js.map