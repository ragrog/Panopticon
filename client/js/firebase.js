// Keyとvalueを取得できるforInを作成

Object.defineProperty(Object.prototype, "forIn", {
	value: function(fn, self) {
		self = self || this;

		Object.keys(this).forEach(function(key, index) {
			var value = this[key];
			fn.call(self, key, value);
		}, this);
	}
});


function Panopticon(config) {

	// 更新時のイベント関数配列(ユーザー用)
	this.changeEvent = [];
	// 更新時のイベント関数配列(オブジェクト内用)
	this.changeEventForSystem = [];

	// データ初期取得時のイベント関数配列(ユーザー用)
	this.getEvent = [];

	// FireBase配列
	this.fire = [];
	// 取得データ配列
	this.table = [];
	// Userの番号
	this.userIndex = -1;

	firebase.initializeApp(config);
	// FireBaseオブジェクトのインスタンス化
	this.fire['today'] = firebase.database().ref("today");
	this.fire['blacklist'] = firebase.database().ref("blacklist");


	// // fireのイベント登録
	this.fire.forIn(function(key, value) {

		// コールバックイベントの初期化
		this.changeEvent[key] = function(array, updateKey) {};
		this.changeEventForSystem[key] = function(){};
		this.getEvent[key] = function(){};

		// テーブルを取得できた時のイベント登録
		value.on("value", function(snapshot) {
			this.table[key] = snapshot.val();
			this.changeEvent[key](this.table[key],null);
		}.bind(this));

		// テーブルが更新された時のイベント登録
		value.on("child_changed", function(snapshot) {
			console.log(snapshot.val());
			this.table[key] = snapshot.val();
			this.changeEvent[key](this.table[key][snapshot.key()],snapshot.key());
			this.changeEventForSystem[key](this.table[key][snapshot.key()],snapshot.key());
		}.bind(this));

	}.bind(this));

}
	// チェンジイベントの登録 (データ名, イベント関数)
	Panopticon.prototype.setChangeEvent = function(key, func) {
		if (this.changeEvent[key] === undefined) return false;
		this.changeEvent[key] = func;
		return true;
	}
	// 取得イベントの登録 (データ名, イベント関数)
	Panopticon.prototype.getEvent = function(key, func) {
		if (this.getEvent[key] === undefined) return false;
		this.getEvent[key] = func;
		return true;
	}


	// テーブル内の値の取得
	Panopticon.prototype.getElement = function(key) {
		return (key in this.table) ? this.table[key] : [];
	}
	Panopticon.prototype.initialize = function(){
	
	}