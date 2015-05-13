/*!
 * bossmin v0.0.0 (https://github.com/WebJedi-DE/bossmin)
 * Copyright 2015 Daniel Weiß
 * Licensed under MIT
 */

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
		$sidebarWrapper.addClass('boss-close');
		var event = $.Event('boss.sidebar.closed');
		$(document).trigger(event);
	};
	BossCollapse.prototype.open = function($icon, $sidebarWrapper) {
		var event = $.Event('boss.sidebar.open');
		$(document).trigger(event);
		$icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
		$sidebarWrapper.removeClass('boss-close');
		var event = $.Event('boss.sidebar.opened');
		$(document).trigger(event);
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