
;(function ( $, window, document, undefined ) {

	var toggle         = '[data-toggle="boss-collapse"]';
	var transitionTime = 1000;
	var BossCollapse   = function(element) {
		$(element).on('click.boss.sidebar', this.toggle);
	};

	BossCollapse.VERSION = '0.0.0';


	BossCollapse.prototype.toggle = function (e) {
		e.preventDefault();

		var $this = $(this);
		var $sidebarWrapper = getSidebarWrapper($this);
		var $icon = getIcon($this);
		var isClosed = $sidebarWrapper.hasClass('boss-close');
		console.log(isClosed);

		if (!isClosed) {
			BossCollapse.prototype.close($icon, $sidebarWrapper);
		} else {
			BossCollapse.prototype.open($icon, $sidebarWrapper);
		}
	};

	BossCollapse.prototype.close = function($icon, $sidebarWrapper) {
		var event = $.Event('boss.sidebar.close');
		$(document).trigger(event);
		$icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
		$sidebarWrapper.addClass('boss-close').one('transitionend', function() {
			var event = $.Event('boss.sidebar.closed');
			$(document).trigger(event);
		});
	};
	BossCollapse.prototype.open = function($icon, $sidebarWrapper) {
		var event = $.Event('boss.sidebar.open');
		$(document).trigger(event);
		$icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
		$sidebarWrapper.removeClass('boss-close').one('transitionend', function() {
			var event = $.Event('boss.sidebar.opened');
			$(document).trigger(event);
		});
	};

	function getSidebarWrapper($this) {
		return $this.parent().parent().parent();
	}

	function getIcon($this) {
		return $this.find('i.fa');
	}

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('boss.sidebar');

			if(!data) {
				$this.data('boss.sidebar', (data = new BossCollapse(this)));
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