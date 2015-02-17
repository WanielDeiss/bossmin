
;(function ( $, window, document, undefined ) {

	var toggle       = '[data-toggle="boss-collapse"]';
	var BossCollapse = function(element) {
		$(element).on('click.boss.collapse', this.toggle);
	};

	BossCollapse.VERSION = '0.0.0';


	BossCollapse.prototype.toggle = function (e) {
		e.preventDefault();

		var $this = $(this);
		var $sidebarWrapper = getSidebarWrapper($this);
		var $linkText = getLinkText($sidebarWrapper);
		var $icon = getIcon($this);
		var isClosed = $sidebarWrapper.hasClass('boss-close');

		if (!isClosed) {
			$icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
			$sidebarWrapper.addClass('boss-close');
		} else {
			$icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
			$sidebarWrapper.removeClass('boss-close');
		}
	};

	function getSidebarWrapper($this) {
		return $this.parent().parent().parent();
	}

	function getLinkText($sidebarWrapper) {
		return $sidebarWrapper.find('span');
	}

	function getIcon($this) {
		return $this.find('i.fa');
	}

	function Plugin(option) {
		console.log('Plugin');
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('boss.collapse');
			console.log('EACH');

			if(!data) {
				$this.data('boss.collapse', (datat = new BossCollapse(this)));
			}
			if(typeof option == 'string') {
				data[option].call($this);
			}
		});
	}

	$.fn.bossCollapse             = Plugin;
	$.fn.bossCollapse.Constructor = BossCollapse;

	$(document).on('click.boss.collapse', toggle, BossCollapse.prototype.toggle);

})( jQuery, window, document );