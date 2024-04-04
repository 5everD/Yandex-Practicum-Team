import axios, { AxiosError } from 'axios'
import type { Request, Response, NextFunction } from 'express'
import { usersService } from '../api/users/service'

const API_YA_BASE = 'https://ya-praktikum.tech/api/v2'
const API_YA_AUTH_ENDPOINT = '/auth/user'

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authCookie = req.cookies?.authCookie
  const uuid = req.cookies?.uuid

  if (!authCookie || !uuid) return next()

  const cookies = `authCookie=${authCookie};uuid=${uuid}`

  try {
    const { data } = await axios.get(API_YA_BASE + API_YA_AUTH_ENDPOINT, {
      headers: {
        Cookie: cookies,
      },
    })
    res.locals.user = data
    console.log('axios')
    console.log({ data })
  } catch (error) {
    console.log(
      (error as AxiosError).message ?? 'server auth: failed get /auth/user api'
    )
  }

  if (res.locals?.user) {
    const data = res.locals.user
    try {
      await usersService.findOrCreate({
        authorIndex: data.id,
        author: data.first_name,
      })
    } catch (error) {
      console.error('server auth: failed to create or get user from db')
    }
  }

  next()
}
