import maps from "./Maps";

function ComparisonContainer() {

    var $controls = $("#controls").clone();
    var $comparison = $("#comparison").clone();
    var $maps = $("#maps").clone();

    $("#app").html(`
    <div class='view'><iframe width='100%' height='100%' id='v1' src="?comparison-view=1&algorithms=2"></iframe></div>
    <div class='view'><iframe width='100%' height='100%' id='v2' src="?comparison-view=2&algorithms=3"></iframe></div>
    <div class='view'><iframe width='100%' height='100%' id='v3' src="?comparison-view=3&algorithms=1"></iframe></div>
    <div class='view'><iframe width='100%' height='100%' id='v4' src="?comparison-view=4&algorithms=0"></iframe></div>`);
    $("body").addClass("comparison-container")
    $("#app").append("<div id='parent-overlay'></div>");
    $("#app").append($controls);
    $("#app").append($comparison);
    $("#app").append($maps);
    
    $("#comparison .comparison-button.stop").click(function () {
        document.location = document.location.origin
    })

    $("#controls .start-simulation").click(function () {
        startSimulation();
    })

    $("#controls .reset-simulation").click(function () {
        resetSimulation();
    })

    maps.forEach(function (map, inx) {
        $("#maps select").append(`<option value='${inx}'>${map.title}</option>`)
    })

    $(document).keydown(function (e) {
        if (e.which == 82) {
            resetSimulation();
        }
        if (e.which == 83) {
            startSimulation();
        }
    });

    $("#maps .maps-select").change(function() {
        $(this).blur(); 
        changeMap($(this).val())
    })

    function resetSimulation() {
        $("iframe").each(function(inx,el) {
            el.contentWindow.postMessage("reset-simulation");
        })
    }

    function startSimulation() {
        $("iframe").each(function(inx,el) {
            el.contentWindow.postMessage("start-simulation");
        })
    }

    function changeMap(index) {
        $("iframe").each(function(inx,el) {
            el.contentWindow.postMessage("map-changed=" + index);
        })
    }
}

export default ComparisonContainer;