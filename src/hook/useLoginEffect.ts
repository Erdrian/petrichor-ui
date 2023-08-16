import { useEffect, useState } from 'react'
import { getToken } from '../utils/common'
// 本质是useEffect，但是会在重新登录时执行
const useLoginEffect = (fn: (...args: any) => void, dep: any[]) => {
	const [token, settoken] = useState(localStorage.getItem('token'))
	useEffect(() => {
		const onReLogin = () => {
			settoken(getToken())
		}
		window.addEventListener('login', onReLogin)
		return () => {
			window.removeEventListener('login', onReLogin)
		}
	}, [])
	useEffect(() => {
		fn()
	}, [token, ...dep])
}

export default useLoginEffect
