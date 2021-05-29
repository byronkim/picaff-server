import token from '@middleware/jwt'
import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'

const userInfo = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
  } else {
    const accessToken = req.headers.authorization.split(' ')[1]
    try {
      const verifyToken = token.verifyToken(accessToken)
      const userInfo = await interfaces.getUserInfo(verifyToken.email)

      const testInfo = await interfaces.getTestResultInfo(verifyToken.id, verifyToken, null, false)

      const likedCoffeeList = await interfaces.getLiked(verifyToken.id, 'coffee')
      const likedProductList = await interfaces.getLiked(verifyToken.id, 'product')
      if (typeof testInfo === 'string') {
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
      }
      const testCoffeeIndex = testInfo.map((data) => {
        return data.coffeeTypeId
      })
      const testProductIndex = testInfo.map((data) => {
        return data.itemTypeId
      })
      const testResultIndex = testCoffeeIndex.concat(testProductIndex)
      const testResult = await Promise.all(
        testInfo.map(async (data) => {
          const coffee = await interfaces.getItemInfo(data.coffeeTypeId, verifyToken.id)
          const product = await interfaces.getItemInfo(data.itemTypeId, verifyToken.id)
          return { coffeeResult: coffee, productResult: product }
        })
      )
      return res.status(200).send({
        userInfo: userInfo,
        testResult: testResult,
        likedCoffeeList: likedCoffeeList,
        likedProductList: likedProductList,
      })
    } catch (err) {
      if (err.name) {
        /** 토큰이 만료되거나, 잘못된 엑세스 토큰으로 로그아웃 시도할때 **/
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
      }
      /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때 **/
      return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' })
    }
  }
}

export default userInfo
