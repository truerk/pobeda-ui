import utils from '@utils'

class Progress {
    constructor(props) {
        this.props = props

        this.state = {
            name: '',
            percent: 0,
            type: 'line',

            progress: null,
            progressPercent: null,
            progressBar: null,

            progressTag: {},
            progressPercentTag: {},
            progressBarTag: {},

            ring: null,
            ringFill: null,
            ringCircle: null,
            ringWidth: 3,
            ringRadius: 30,
            ringFillColor: '#F3F1F0',
            ringColor: '#A3A2A1'
        }


        this.state = utils.object.extend(this.state, this.props)

        this.init()
    }

    /**
     * Инициализация Progress
     */
    init() {
        if (this.state.progress) {
            this.state.progress.setAttribute('data-percent', this.state.percent);
            this.state.progress.setAttribute('am-progress', this.state.name);

            for (let key in this.state.progressTag) {
                this.state.progress.setAttribute(key, this.state.progressTag[key]);
            }

            const progressBar = this.state.progress.querySelector('[am-progress-bar]');
            const progressPercent = this.state.progress.querySelector('[am-progress-percent]');

            if (progressBar) {
                this.state.progressBar = progressBar;
                this.state.progressBar.setAttribute('style', `width:${this.state.percent}%`);

                for (let key in this.state.progressBarTag) {
                    this.state.progressBar.setAttribute(key, this.state.progressBarTag[key]);
                }
            }

            if (progressPercent) {
                this.state.progressPercent = progressPercent;
                this.state.progressPercent.innerText = this.state.percent + '%';

                for (let key in this.state.progressPercentTag) {
                    this.state.progressPercent.setAttribute(key, this.state.progressPercentTag[key]);
                }
            }
        } else if(this.state.ring) {
            const normalizedRadius = this.state.ringRadius - this.state.ringWidth * 2;
            const circumference = normalizedRadius * 2 * Math.PI;
            const offset = circumference - (this.state.percent / 100 * circumference);
            const circle = this.state.ringCircle || this.state.ring.querySelector('circle');
            const circleFill = this.state.ringFill || this.state.ring.querySelector('> circle');

            this.state.ring.setAttributes({
                'am-progress-ring': this.state.name,
                'width': this.state.ringRadius * 2,
                'height': this.state.ringRadius * 2
            })

            circle.setAttributes({
                'stroke': this.state.ringColor,
                'stroke-dasharray': circumference,
                'stroke-width': this.state.ringWidth,
                'fill': 'transparent',
                'r': normalizedRadius,
                'cx': this.state.ringRadius,
                'cy': this.state.ringRadius,
                'style': 'stroke-dashoffset:'+offset
            })

            circleFill.setAttributes({
                'stroke': this.state.ringFillColor,
                'stroke-dasharray': circumference,
                'stroke-width': this.state.ringWidth,
                'fill': 'transparent',
                'r': normalizedRadius,
                'cx': this.state.ringRadius,
                'cy': this.state.ringRadius,
                'style': 'stroke-dashoffset:0'
            })
        }
    }

    /**
     * Создает Progress
     */
    build() {
        if (this.state.type === 'line') {
            const progressBar = utils.element.create('div', {'am-progress-bar': '', 'style': `width:${this.state.percent}%`, ...this.state.progressBarTag});
            const progressPercent = utils.element.create('span', {'am-progress-percent': '', ...this.state.progressPercentTag}, [], `${this.state.percent}%`);
            const progress = utils.element.create('div', {'am-progress': this.state.name, 'data-percent': this.state.percent, ...this.state.progressTag}, [progressPercent, progressBar]);

            this.state.progress = progress;
            this.state.progressBar = progressBar;
            this.state.progressPercent = progressPercent;

            return progress;
        } else if (this.state.type === 'ring') {
            const normalizedRadius = this.state.ringRadius - this.state.ringWidth * 2;
            const circumference = normalizedRadius * 2 * Math.PI;
            const offset = circumference - (this.state.percent / 100 * circumference);

            const circle = utils.element.create('circle', {
                stroke: this.state.ringColor,
                'stroke-dasharray': circumference,
                style: `stroke-dashoffset: ${offset}`,
                'stroke-width': this.state.ringWidth,
                fill: 'transparent',
                r: normalizedRadius,
                cx: this.state.ringRadius,
                cy: this.state.ringRadius,
            }, [], false, 'http://www.w3.org/2000/svg');

            const circleFill = utils.element.create('circle', {
                stroke: this.state.ringFillColor,
                'stroke-dasharray': circumference,
                style: `stroke-dashoffset: 0`,
                'stroke-width': this.state.ringWidth,
                fill: 'transparent',
                r: normalizedRadius,
                cx: this.state.ringRadius,
                cy: this.state.ringRadius,
            }, [], false, 'http://www.w3.org/2000/svg');

            const svg = utils.element.create('svg', {'am-progress-ring': this.state.name, width: this.state.ringRadius * 2, height: this.state.ringRadius * 2}, [circleFill, circle], false, 'http://www.w3.org/2000/svg');

            this.state.ring = svg;
            this.state.ringCircle = circle;
            this.state.ringFill = circleFill;

            return svg;
        }
        return utils.element.create('div', {hidden: true});
    }

    /**
     * Устанавливает процент
     * @param {Number} value значение прогресса 0-100
     */
    setPercent(value) {
        if (value >= 100) {
            this.state.percent = 100;
        } else if (value <= 0) {
            this.state.percent = 0;
        } else {
            this.state.percent = value;
        }
        this.init()
    }

    /**
     * Возврашает текущий процент
     * @returns {number} percent
     */
    getPercent() {
        return this.state.percent;
    }

    /**
     * Устанавливает элемент для Progress
     * @param {HTMLElement} progress 
     */
    setProgress(progress) {
        this.state.progress = progress;
        this.init()
    }

    /**
     * Устанавливает элемент для Progress (кольцевой)
     * @param {HTMLElement} ring 
     */
    setRing(ring) {
        this.state.progress = ring;
        this.init()
    }

    /**
     * Возвращает Progress
     * @returns {HTMLElement} line
     */
    getProgress() {
        return this.state.progress;
    }

    /**
     * Возвращает Progress (ring)
     * @returns {HTMLElement} ring
     */
    getRing() {
        return this.state.ring;
    }

    /**
     * Скрывает Progress
     */
    hide() {
        if (this.state.ring) {
            this.state.ring.setAttribute('hidden', '')
        }
        if (this.state.progress) {
            this.state.progress.setAttribute('hidden', '')
        }
    }

    /**
     * Показывает Progress
     */
    show() {
        if (this.state.ring) {
            this.state.ring.removeAttribute('hidden')
        }
        if (this.state.progress) {
            this.state.progress.removeAttribute('hidden')
        }
    }
}

export default Progress