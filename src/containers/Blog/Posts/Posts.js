import React, { Component } from 'react'
import Axios from '../../../axios'

import './Posts.css'

import Post from '../../../components/Post/Post'

class Posts extends Component {
	state = {
		posts: [],
	}

	componentDidMount () {
		console.log(this.props)
		Axios.get('/posts')
			.then(response => {
				const posts = response.data.slice(0, 4)
				const updatedPosts = posts.map(post => {
					return {
						...post,
						author: 'Max'
					}
				})
				this.setState({posts: updatedPosts})
			})
			.catch(error => {
				console.log(error)
				// this.setState({error: true})
			})
	}

	postSelectHandler = (id) => {
		// this.setState({selectedPostId:id})
		this.props.history.push({pathname: '/' + id})
	}

	render () {
		let posts = <p style={{textAlign: 'center'}}>Something went wrong...</p>
		if (!this.state.error) {
			posts = this.state.posts.map(post => {
				return (
					// <Link to={'/' + post.id} key={post.id}>
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						click={() => this.postSelectHandler(post.id)}/>
					// </Link>
				)
			})
		}
		return (
			<section className="Posts">
				{posts}
			</section>
		)
	}
}

export default Posts
