import { Response, Request } from 'express'
import Crawling from '@middleware/crawling'

const crawling = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    console.log(req)
    const data = await Crawling.getData(req.body.itemName)
    return res.status(200).send(data)
  } catch (err) {
    console.log('crawling error')
    return res.status(403).send({ message: '정확한 정보를 입력해주세요' })
  }
}

export default crawling
