          $(function(){
		$('#password').keyup(function () {
			var __th = $(this);
 
			if (!__th.val()) {
				Primary();
				return;
			}
			if (__th.val().length < 6) {
				Weak();
				return;
			}
			var _r = checkPassword(__th);
			if (_r < 1) {
				Primary();
				return;
			}
 
			if (_r > 0 && _r < 2) {
				Weak();
			} else if (_r >= 2 && _r < 4) {
				Medium();
			} else if (_r >= 4) {
				Tough();
			}
		});
		function Primary() {
			$('#pwdLevel_1').attr('class', 'pwdstrength_default');
			$('#pwdLevel_2').attr('class', 'pwdstrength_default');
			$('#pwdLevel_3').attr('class', 'pwdstrength_default');
		}
		function Weak() {
			$('#pwdLevel_1').attr('class', 'pwdstrength_weak');
			$('#pwdLevel_2').attr('class', 'pwdstrength_default');
			$('#pwdLevel_3').attr('class', 'pwdstrength_default');
		}
		function Medium() {
			$('#pwdLevel_1').attr('class', 'pwdstrength_weak');
			$('#pwdLevel_2').attr('class', 'pwdstrength_medium');
			$('#pwdLevel_3').attr('class', 'pwdstrength_default');
		}
		function Tough() {
			$('#pwdLevel_1').attr('class', 'pwdstrength_weak');
			$('#pwdLevel_2').attr('class', 'pwdstrength_medium');
			$('#pwdLevel_3').attr('class', 'pwdstrength_tough');
		}
		function checkPassword(pwdinput) {
			var str = $(pwdinput).val();
			var len = str.length;
 
			var cat = /.{16}/g;
			if (len == 0) return 1;
			if (len > 16) { $(pwdinput).val(str.match(cat)[0]); }
			cat = /.*[\u4e00-\u9fa5]+.*$/;
			if (cat.test(str)) {
				return -1;
			}
			cat = /\d/;
			var maths = cat.test(str);
			cat = /[a-z]/;
			var smalls = cat.test(str);
			cat = /[A-Z]/;
			var bigs = cat.test(str);
			var corps = corpses(pwdinput);
			var num = maths + smalls + bigs + corps;
 
			if (len < 6) { return 1; }
 
			if (len >= 6 && len <= 8) {
				if (num == 1) return 1;
				if (num == 2 || num == 3) return 2;
				if (num == 4) return 3;
			}
 
			if (len > 8 && len <= 11) {
				if (num == 1) return 2;
				if (num == 2) return 3;
				if (num == 3) return 4;
				if (num == 4) return 5;
			}
 
			if (len > 11) {
				if (num == 1) return 3;
				if (num == 2) return 4;
				if (num > 2) return 5;
			}
		}
 
		function corpses(pwdinput) {
			var cat = /./g;
			var str = $(pwdinput).val();
			var sz = str.match(cat);
			for (var i = 0; i < sz.length; i++) {
				cat = /\d/;
				maths_01 = cat.test(sz[i]);
				cat = /[a-z]/;
				smalls_01 = cat.test(sz[i]);
				cat = /[A-Z]/;
				bigs_01 = cat.test(sz[i]);
				if (!maths_01 && !smalls_01 && !bigs_01) { return true; }
			}
			return false;
		}
});
