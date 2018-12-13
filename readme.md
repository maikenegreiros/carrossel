# Carrossel

Simple usage

```js
import carousel from './carrossel'

const container = document.querySelector('.carousel')
const elements = document.querySelectorAll('.carousel__item')
const arrowLeft = document.querySelector('.carousel__button-left')
const arrowRight = document.querySelector('.carousel__button-right')

carousel({container, elements, arrowLeft, arrowRight})
```
