// Global
import './utils/global';

// Bootstrap
{{ if .Site.Params.bootstrap.alert }}
    import Alert from 'js/bootstrap/src/alert';
{{ end }}
{{ if .Site.Params.bootstrap.carousel }}
i   mport Carousel from 'js/bootstrap/src/carousel';
{{ end }}
{{ if .Site.Params.bootstrap.collapse }}
    import Collapse from 'js/bootstrap/src/collapse';
{{ end }}
{{ if .Site.Params.bootstrap.dropdown }}
    import Dropdown from 'js/bootstrap/src/dropdown';
{{ end }}
{{ if .Site.Params.bootstrap.modal }}
    import Modal from 'js/bootstrap/src/modal';
{{ end }}
{{ if .Site.Params.bootstrap.offcanvas }}
    import Offcanvas from 'js/bootstrap/src/offcanvas';
{{ end }}
{{ if .Site.Params.bootstrap.popover }}
    import Popover from 'js/bootstrap/src/popover';
{{ end }}
{{ if .Site.Params.bootstrap.scrollspy }}
    import Scrollspy from 'js/bootstrap/src/scrollspy';
{{ end }}
{{ if .Site.Params.bootstrap.tab }}
    import Tab from 'js/bootstrap/src/tab';
{{ end }}
{{ if .Site.Params.bootstrap.popover }}
    import Toast from 'js/bootstrap/src/popover';
{{ end }}
{{ if .Site.Params.bootstrap.tooltip }}
    import './features/tooltip';
{{ end }}

// Add custom vendors
import './vendors/custom';

// Features
{{ if .Site.Params.animation }}
    import './features/animation';
{{ end }}
{{ if .Site.Params.carousel }}
    import './features/carousel';
{{ end }}
{{ if .Site.Params.map }}
    import './features/map';
{{ end }}
{{ if .Site.Params.parallax.enable }}
    import './features/parallax';
{{ end }}

// Add custom features
import './features/custom';

// Blocks
{{ with .Site.Params.admin.blocks.enable }}
    {{ range . }}
        {{ if fileExists (print "assets/js/blocks/" . ".js") }}
            import './blocks/{{ . }}.js';
        {{ end }}
    {{ end }}
{{ else }}
    import './blocks/index.js';
{{ end }}

// Components
import './components/index';

// Add custom components
import './components/custom';
