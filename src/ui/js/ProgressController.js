import createElement from '../utils/create_element'

export class ProgressController {
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

        if (typeof this.props === 'object') {
            this.state = {
                ...this.state,
                progress: this.props.progress ? this.props.progress : this.state.progress,
                progressPercent: this.props.progressPercent ? this.props.progressPercent : this.state.progressPercent,
                progressBar: this.props.progressBar ? this.props.progressBar : this.state.progressBar,
                percent: this.props.percent ? this.props.percent : this.state.percent,
                name: this.props.name ? this.props.name : this.state.name,
                height: this.props.height ? this.props.height : this.state.height,
                type: this.props.type ? this.props.type : this.state.type,

                ring: this.props.ring ? this.props.ring : this.state.ring,
                ringFill: this.props.ringFill ? this.props.ringFill : this.state.ringFill,
                ringCircle: this.props.ringCircle ? this.props.ringCircle : this.state.ringCircle,
                ringWidth: this.props.ringWidth ? this.props.ringWidth : this.state.ringWidth,
                ringRadius: this.props.ringRadius ? this.props.ringRadius : this.state.ringRadius,
                ringColor: this.props.ringColor ? this.props.ringColor : this.state.ringColor,
                ringFillColor: this.props.ringFillColor ? this.props.ringFillColor : this.state.ringFillColor,
            }

            if ('progressTag' in this.props && typeof this.props.progressTag === 'object') {
                this.state.progressTag = this.props.progressTag
            }

            if ('progressPercentTag' in this.props && typeof this.props.progressPercentTag === 'object') {
                this.state.progressPercentTag = this.props.progressPercentTag
            }

            if ('progressBarTag' in this.props && typeof this.props.progressBarTag === 'object') {
                this.state.progressBarTag = this.props.progressBarTag
            }
        }

        this.init()
    }

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

            this.state.ring.setAttribute('am-progress-ring', this.state.name);
            this.state.ring.setAttribute('width', this.state.ringRadius * 2);
            this.state.ring.setAttribute('height', this.state.ringRadius * 2);

            circle.setAttribute('stroke', this.state.ringColor);
            circle.setAttribute('stroke-dasharray', circumference);
            circle.setAttribute('stroke-width', this.state.ringWidth);
            circle.setAttribute('fill', 'transparent');
            circle.setAttribute('r', normalizedRadius);
            circle.setAttribute('cx', this.state.ringRadius);
            circle.setAttribute('cy', this.state.ringRadius);
            circle.style.strokeDashoffset = offset;

            circleFill.setAttribute('stroke', this.state.ringFillColor);
            circleFill.setAttribute('stroke-dasharray', circumference);
            circleFill.setAttribute('stroke-width', this.state.ringWidth);
            circleFill.setAttribute('fill', 'transparent');
            circleFill.setAttribute('r', normalizedRadius);
            circleFill.setAttribute('cx', this.state.ringRadius);
            circleFill.setAttribute('cy', this.state.ringRadius);
            circleFill.style.strokeDashoffset = 0;
        }
    }

    build() {
        if (this.state.type === 'line') {
            const progressBar = createElement('div', {'am-progress-bar': '', 'style': `width:${this.state.percent}%`, ...this.state.progressBarTag});
            const progressPercent = createElement('span', {'am-progress-percent': '', ...this.state.progressPercentTag}, [], `${this.state.percent}%`);
            const progress = createElement('div', {'am-progress': this.state.name, 'data-percent': this.state.percent, ...this.state.progressTag}, [progressPercent, progressBar]);

            this.state.progress = progress;
            this.state.progressBar = progressBar;
            this.state.progressPercent = progressPercent;

            return progress;
        } else if (this.state.type === 'ring') {
            const normalizedRadius = this.state.ringRadius - this.state.ringWidth * 2;
            const circumference = normalizedRadius * 2 * Math.PI;
            const offset = circumference - (this.state.percent / 100 * circumference);

            const circle = createElement('circle', {
                stroke: this.state.ringColor,
                'stroke-dasharray': circumference,
                style: `stroke-dashoffset: ${offset}`,
                'stroke-width': this.state.ringWidth,
                fill: 'transparent',
                r: normalizedRadius,
                cx: this.state.ringRadius,
                cy: this.state.ringRadius,
            }, [], false, 'http://www.w3.org/2000/svg');

            const circleFill = createElement('circle', {
                stroke: this.state.ringFillColor,
                'stroke-dasharray': circumference,
                style: `stroke-dashoffset: 0`,
                'stroke-width': this.state.ringWidth,
                fill: 'transparent',
                r: normalizedRadius,
                cx: this.state.ringRadius,
                cy: this.state.ringRadius,
            }, [], false, 'http://www.w3.org/2000/svg');

            const svg = createElement('svg', {'am-progress-ring': this.state.name, width: this.state.ringRadius * 2, height: this.state.ringRadius * 2}, [circleFill, circle], false, 'http://www.w3.org/2000/svg');

            this.state.ring = svg;
            this.state.ringCircle = circle;
            this.state.ringFill = circleFill;

            return svg;
        }
        return createElement('div', {hidden: true});
    }

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

    getPercent() {
        return this.state.percent;
    }

    setProgress(progress) {
        this.state.progress = progress;
        this.init()
    }

    setRing(ring) {
        this.state.progress = ring;
        this.init()
    }

    getProgress() {
        return this.state.progress;
    }

    getRing() {
        return this.state.ring;
    }

    hide() {
        if (this.state.ring) {
            this.state.ring.setAttribute('hidden', '')
        }
        if (this.state.progress) {
            this.state.progress.setAttribute('hidden', '')
        }
    }

    show() {
        if (this.state.ring) {
            this.state.ring.removeAttribute('hidden')
        }
        if (this.state.progress) {
            this.state.progress.removeAttribute('hidden')
        }
    }
}