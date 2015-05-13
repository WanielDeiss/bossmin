;(function ( $, window, document, undefined ) {

	var toggle         = '[data-toggle="boss-sidebar-dropdown"]';
	var BossDropdown   = function(element) {
		$(element).on('click.boss.sidebar.dropdown', this.toggle);
	};

	BossDropdown.VERSION = '0.0.0';

	BossDropdown.prototype.toggle = function (e) {
		e.preventDefault();

		var $this = $(this);
		var $parent = $this.parent();
		var $sidebarMenu = getSidebarMenu($parent);
		var isOpen = $parent.hasClass('open');
		var collapseOpen = $('#wrapper-sidebar').hasClass('boss-close');

		if(!collapseOpen) {
			if (!isOpen) {
				BossDropdown.prototype.open($this, $parent, $sidebarMenu);
			} else {
				BossDropdown.prototype.close($this, $parent, $sidebarMenu);
			}
		} else {
			BossDropdown.prototype.closeall;
		}

		$this.blur();
	};

	BossDropdown.prototype.open = function ($this, $parent, $sidebarMenu) {
		$this.addClass('up');
		$parent.addClass('open');
	};

	BossDropdown.prototype.close = function ($this, $parent, $sidebarMenu) {
		$this.removeClass('up');
		$parent.removeClass('open');
	};

	BossDropdown.prototype.closeall = function() {
		var $sidebarDropdownMenu = $('.sidebar-dropdown-menu'),
			$parent = $sidebarDropdownMenu.parent(),
			$up = $parent.find('.up');
		$parent.removeClass('open');
		$up.removeClass('up');
		$sidebarDropdownMenu.hide(function() {
			removeStyleAttr(this);
		});
	};

	function removeStyleAttr($this) {
		$($this).removeAttr('style');
	}

	function getSidebarMenu($this) {
		return $this.find('.sidebar-dropdown-menu');
	}

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('boss.sidebar.dropdown');

			if(!data) {
				$this.data('boss.sidebar.dropdown', (data = new BossDropdown(this)));
			}
			if(typeof option == 'string') {
				data[option].call($this);
			}
		});
	}

	$.fn.bossDropdown             = Plugin;
	$.fn.bossDropdown.Constructor = BossDropdown;

	$(document).on('click.boss.sidebar.dropdown', toggle, BossDropdown.prototype.toggle);
	$(document).on('boss.sidebar.closed', BossDropdown.prototype.closeall);
})( jQuery, window, document );