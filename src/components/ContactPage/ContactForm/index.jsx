import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import Recaptcha from 'react-google-recaptcha'
import { navigate } from 'gatsby'
import { SmallerContainer, CustomButton, ThemeContext } from '../../common'
import { Wrapper, InputField, Center, Error, Text } from './styles'

const ContactForm = ({
	name,
	email,
	message,
	handleChange,
	handleSubmit,
	handleRecaptcha,
	handleTouch,
	nameError,
	emailError,
	messageError
}) => (
	<ThemeContext.Consumer>
		{({ theme }) => (
			<SmallerContainer contact tl>
				<Text theme={theme}>Feel free to email me via <a href="mailto:ismai23l@hotmail.com" target="_top">ismai23l@hotmail.com</a></Text>
				<Text as="p" theme={theme}>Or fill in the contact form down below</Text>
				<form
					action="/thanks/"
					name="smakosh"
					method="post"
					data-netlify="true"
					data-netlify-recaptcha="true"
					data-netlify-honeypot="bot-field"
					onSubmit={handleSubmit}
				>
					<noscript>
						<p>This form won’t work with Javascript disabled</p>
					</noscript>
					<Wrapper theme={theme}>
						<label>
							Full name:
							<InputField as="input" type="text" name="name" value={name} error={nameError} onBlur={handleTouch} onChange={handleChange} />
							{nameError && <Error>{nameError}</Error>}
						</label>
					</Wrapper>
					<Wrapper theme={theme}>
						<label>
							Your email:
							<InputField as="input" type="email" name="email" value={email} error={emailError} onBlur={handleTouch} onChange={handleChange} />
							{emailError && <Error>{emailError}</Error>}
						</label>
					</Wrapper>
					<Wrapper theme={theme}>
						<label>
							Message:
							<InputField as="textarea" textarea name="message" value={message} error={messageError} onBlur={handleTouch} onChange={handleChange} />
							{messageError && <Error>{messageError}</Error>}
						</label>
					</Wrapper>
					<Recaptcha sitekey="6Lcs6lQUAAAAAEwhNH2IsobIe2csdda4TU3efpMN" onChange={handleRecaptcha} />
					<Center>
						<CustomButton>Send</CustomButton>
					</Center>
				</form>
			</SmallerContainer>
		)}
	</ThemeContext.Consumer>
)

const enhance = compose(
	withStateHandlers(
		() => ({
			name: '', email: '', message: '', nameError: null, emailError: null, messageError: null, recaptcha: null
		}),
		{
			handleTouch: () => e => { // eslint-disable-line
				const isEmail = email => {
					const RE = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
					return RE.test(email)
				}
				if (!e.target.value) {
					return {
						[`${e.target.name}Error`]: `${e.target.name} field is required`
					}
				}
				if (e.target.name === 'email' && !isEmail(e.target.value)) {
					return {
						emailError: 'Email is invalid'
					}
				}

				if (e.target.value) {
					return {
						[`${e.target.name}Error`]: null
					}
				}
			},
			handleSubmit: ({ name, email, message, recaptcha }) => e => {
				e.preventDefault()
				const form = e.target
				if (!name || !email || !message || !recaptcha) {
					alert('Please fill in all the required fields :)')
				} else {
					const encode = data => {
						return Object.keys(data)
							.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
							.join('&')
					}
					fetch('/?no-cache=1', {
						method: 'POST',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body: encode({
							'form-name': form.getAttribute('name'),
							name,
							email,
							message,
							'g-recaptcha-response': recaptcha
						})
					})
						.then(() => navigate(form.getAttribute('action')))
						.catch(() => alert('Something went wrong, please try again!'))
					e.target.name.value = ''
					e.target.email.value = ''
					e.target.message.value = ''
				}
			},
			handleRecaptcha: () => value => ({ recaptcha: value  }),
			handleChange: () => e => ({ [e.target.name]: e.target.value })
		}
	)
)

export default enhance(ContactForm)
