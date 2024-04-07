import axios, { AxiosResponse } from "axios";

export function usePost<Body = any | void, Res = any>(url: string) {
	return async (body: Body) => {
		let { data, status } = await axios.post<any, AxiosResponse<Res, any>, Body>(
			url,
			body
		);
		return { data, status };
	};
}
