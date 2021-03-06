import styled from 'styled-components'

export const MagicalButton = styled.a`
	color: #fff;
	text-decoration: none;
	padding: .9rem 1.4rem;
	background: #00c3ff;
	border-radius: .3rem;
	box-shadow: rgba(0, 196, 255, 0.9) 0px 13px 19px -6px;
	transition: .5s;

	&:hover  {
		box-shadow: 0px 0px 17px 0px rgba(0, 196, 255, 0.36);
		transition: .5s;
	}

	&:first-child {
		margin-right: 1rem;
		background: #f9f9f9;
		color: #00c3ff;
		box-shadow: rgb(185, 185, 185) 0px 13px 19px -6px;

		&:hover  {
			box-shadow: 0px 0px 17px 0px rgba(185, 185, 185, 0.4);
		}
	}
`

export const IntroWrapper = styled.div`
	padding: 3rem 1rem;
	p {
		color: gray;
		margin-bottom: 2rem;
	}
	${({ theme }) => theme === 'dark' && `
		color: #fff;
	`}
`
