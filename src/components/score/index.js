import score from './score';

score.install = function(Vue) {
	Vue.component(score.name, score);
}

export default score;