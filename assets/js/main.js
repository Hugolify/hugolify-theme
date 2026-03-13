{{- $params := .Site.Params }}

// Globals
import './utils/global';

// Add custom vendors
import './vendors/custom';

// Features
{{ if $params.animation }}
  import './features/animation';
{{ end }}
{{ if $params.carousel }}
  import './features/carousel';
{{ end }}
{{ if $params.map }}
  import './features/map';
{{ end }}
{{ if $params.parallax.enable }}
  import './features/parallax';
{{ end }}
{{ if $params.search.enable }}
  import './features/search';
{{ end }}
{{ if $params.vimeo }}
  import './features/vimeo';
{{ end }}
{{ if $params.youtube }}
  import './features/youtube';
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
