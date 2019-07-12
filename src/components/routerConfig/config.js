export default {
	sideBar: [
		{
			type: "menu",
			icon: "team",
			desc: "会员管理",
			auth: ["admin", "guest"],
			subs: [
				{
					to: "/customer/add",
					icon: "user",
					desc: "会员新增",
					auth: ["admin", "guest"],
				},
				{
					to: "/customer/all",
					icon: "usergroup-add",
					desc: "现有会员",
					auth: ["admin", "guest"],
				},
			],
		},
		{
			type: "menu",
			icon: "book",
			desc: "卡品管理",
			auth: ["admin"],
			to: "/cardShow",
		},
		{
			type: "menu",
			icon: "area-chart",
			desc: "统计分析",
			to: "/statistics",
			auth: ["admin"],
		}],
	content: [
		{
			type: "component",
			path: "customer/add",
			component: "CustomerAdd",
			auth: ["admin", "guest"]
		},
		{
			type: "component",
			path: "customer/all",
			component: "CustomerShow",
			auth: ["admin", "guest"]
		},
		{
			type: "component",
			path: "cardShow",
			component: "CardShow",
			auth: ["admin"]
		},
		{
			type: "component",
			path: "statistics",
			component: "Statistics",
			auth: ["admin"]
		},
	]
}