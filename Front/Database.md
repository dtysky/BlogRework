# Structure for database

## Acticles

	:::json
	[
		{
			title:  "",
			slug:  "",
			tag: [
					{
						view: "",
						slug: ""
					},
					...
				],
			author: [
					{
						view: "",and
						slug: ""
					},
					...
				],
			category: "",
			date: "YYYY.mm.DD,HH:MM:SS",
			summary:  "",
			content: "",
			...
		},
		...
	]


## Archives

	:::json
	[
		{
			name: "all",
			title:  "",
			slug: "",
			tag: [
					{
						view: "",
						slug: ""
					},
					...
				],
			author: [
					{
						view: "",
						slug: ""
					},
					...
				],
			category: "",
			date: "YYYY.mm.DD,HH:MM:SS",
			summary: "",
			...
		},
		...
	]


## Category

	:::json
	[
		{ 
			name: ""(category slug),
			view: "",
			title:  "",
			slug: "",
			tag: [
					{
						view: "",
						slug: ""
					},
					...
				],
			author: [
					{
						view: "",
						slug: ""
					},
					...
				],
			category: "",
			date: "YYYY.mm.DD,HH:MM:SS",
			summary: "",
			...
		},
		...
	]

## Tag

	:::json
	[
		{ 
			name: ""(tag slug),
			view: "",
			title:  "",
			slug: "",
			tag: [
					{
						view: "",
						slug: ""
					},
					...
				],
			author: [
					{
						view: "",
						slug: ""
					},
					...
				],
			category: "",
			date: "YYYY.mm.DD,HH:MM:SS",
			summary: "",
			...
		},
		...
	]

## Author

	:::json
	[
		{ 
			name: ""(author slug),
			view: "",			
			title:  "",
			slug: "",
			tag: [
					{
						view: "",
						slug: ""
					},
					...
				],
			author: [
					{
						view: "",
						slug: ""
					},
					...
				],
			category: "",
			date: "YYYY.mm.DD,HH:MM:SS",
			summary: "",
			...
		},
		...
	]

## Tags

	:::json
	[
		{
			view: "",
			slug: "",
			count: 0
		},
		...
	]

## Authors

	:::json
	[
		{
			view: "",
			slug: ""
		},
		...
	]