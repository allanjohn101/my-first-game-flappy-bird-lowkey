const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Ikaw ay nagising sa isang kakaibang lugar at may nakita kang bawang.',
    options: [
      {
        text: 'Kunin ang bawang',
        setState: { bawang: true },
        nextText: 2
      },
      {
        text: 'umalis na lamang',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Ikaw ay naglibot upang malaman kung nasaaan kang lugar, sa iyong pagiikot ay nakita mo ang isang manlalaku.',
    options: [
      {
        text: 'Ipagpalit ng tirador ang bawang',
        requiredState: (currentState) => currentState.bawang,
        setState: { bawang: false, tirador: true },
        nextText: 3
      },
      {
        text: 'Ipagpalit ng Tinapay ang bawang',
        requiredState: (currentState) => currentState.bawang,
        setState: { bawang: false, tinapay: true },
        nextText: 3
      },
      {
        text: 'Wag pansinin ang manlalaku',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Pagkatapos iwanan ang manlalaku ikaw ay nakaramdam ng pagod at may nakitang maliit na bayan malapit sa nakikitang madilim na kagubatan.',
    options: [
      {
        text: 'Pumunta sa madilim na kagubatan',
        nextText: 4
      },
      {
        text: 'Maghanap ng mauupahang kwartong matutulugan sa bayan',
        nextText: 5
      },
      {
        text: 'Maghanap ng Dayami pwede higaan',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'ikaw ay nakatulog habang naglalakbay sa kagubatan at may roon aswang na nagmamasid at ikaw ay sinakmal habang natutulog.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Dahil ikaw ay walang pera ikaw ay napilitan na pumasok sa pinakamalapit na paupahan ng walang pahintulot at hinuli ng mga pulis .',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Ikaw ay nagising ng masigla at handa nang makipagsapalaran sa madilim na kagubatan.',
    options: [
      {
        text: 'Pumunta sa madilim na kagubatan',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'habang naglalakad sa madilim na kagubatan ikaw ay nakatagpo ng isang Aswang.',
    options: [
      {
        text: 'Subukan Tumakbo',
        nextText: 8
      },
      {
        text: 'Atakihin ang aswang gamit ang tirador',
        requiredState: (currentState) => currentState.tirador,
        nextText: 9
      },
      {
        text: 'Subukan pakainin ng tinapay ang aswang',
        requiredState: (currentState) => currentState.tinapay,
        nextText: 10
      },
      {
        text: 'Itapon ang bawang sa aswang',
        requiredState: (currentState) => currentState.bawang,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Ang pagbabalak na tumakbo ay nauwi lamang sa wala dahil ikaw ay madaling naabol at sinakmal ng aswang.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Ikaw ay nagkamali sa inaakalang tatamaan ng bala ng tirador ang aswang.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Hindi pinanin ang tinapay bagkos ikaw ang kinain.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Tinapon mo ang bawang sa aswang at ito ay nasunog at naging abo at tuluyan na ngang napatay ang aswang. sa iyong paglapit ay may nakita kang kumikinang na itim na bilog sa abo ng aswang. abangan ang susunod na kabanata.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()