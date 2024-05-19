import * as https from 'node:https'
import { v4 as uuidv4 } from 'uuid'
import { imgs } from './config'
import * as path from 'node:path'
import * as fs from 'node:fs'

export function downloadFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          const fileName = `imgs/${uuidv4()}${path.parse(url).ext}`
          const file = fs.createWriteStream(`${imgs}${fileName}`)
          res.pipe(file)
          res.on('error', (err) => {
            reject(err)
          })
          res.on('end', () => {
            resolve(fileName)
          })
        }
      })
      .on('error', (err) => reject(err))
  })
}
