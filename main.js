// Ждем, пока вся страница (HTML) полностью загрузится
document.addEventListener('DOMContentLoaded', function () {
	console.log('Защита FRWCK активирована...')

	const TRAP_SETTINGS = {
		botName: 'frwck_contact_bot',
		message:
			'Приношу глубочайшие извинения, я пытался ввести вредоносный скрипт в ваше портфолио,простите за беспокойство. 🏴‍☠️',
		dangerZones: ['<script', 'alert(', "'", '"', 'eval('],
	}

	function activateTrap() {
		console.log('ВЗЛОМ ОБНАРУЖЕН! Активация...')

		// Звук
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		const osc = audioCtx.createOscillator()
		osc.type = 'sawtooth'
		osc.frequency.setValueAtTime(100, audioCtx.currentTime)
		osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 1)
		osc.connect(audioCtx.destination)
		osc.start()
		osc.stop(audioCtx.currentTime + 1)

		// Черный экран
		document.body.innerHTML =
			"<div style='background:black; color:#d3d3d3; height:100vh; width:100%; display:flex; z-index:99999; flex-direction:column; align-items:flex-start; padding-top:50; justifly-content:center; text-align:center; font-family:monospace; font-size:30px;' position:absolute; top:10vh; >         XSS-ATACK? HAHAH YOU DETECTED...   <img src=img/doxbin.jpg style='height:200px width:450px;bordder: 2px solid #00008B'<div>"
		;("<img src=img/doxbin.jpg style='height:200px width:450px;bordder: 2px solid #00008B'")

		// Редирект
		setTimeout(() => {
			window.location.href = `https://t.me/frwck_contact_bot?text=${TRAP_SETTINGS.message}`
		}, 1000)
	}

	// Ищем ВСЕ инпуты и текстовые области
	const allInputs = document.querySelectorAll('input, textarea')

	if (allInputs.length === 0) {
		console.error(
			'ОШИБКА: Скрипт не нашел ни одного поля ввода (input или textarea)!'
		)
	}

	allInputs.forEach(input => {
		input.addEventListener('input', e => {
			const val = e.target.value.toLowerCase()
			const isDangerous = TRAP_SETTINGS.dangerZones.some(char =>
				val.includes(char)
			)

			if (isDangerous) {
				input.disabled = true
				activateTrap()
			}
		})
	})
})

// Ждем полной загрузки, чтобы JS точно нашел кнопку
document.addEventListener('DOMContentLoaded', () => {
	const sendBtn = document.getElementById('send-btn')
	const chatInput = document.getElementById('user_message')

	if (sendBtn) {
		console.log('Кнопка найдена и готова к работе!') // Проверь это в консоли F12

		sendBtn.onclick = function () {
			const userText = chatInput.value.trim()

			if (userText.length > 0) {
				const encodedText = encodeURIComponent(userText)
				window.location.href = `https://t.me{encodedText}`
			} else {
				alert('Поле пустое! Напиши что-нибудь.')
			}
		}
	} else {
		console.error("ОШИБКА: Кнопка с id='send-btn' не найдена на этой странице!")
	}
})
