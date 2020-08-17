function Interface() {

    $("#info-control").click(function () {
        $("html").addClass("meta-show-info");        
        $("body").append("<div id='overlay'></div>")

        $("#overlay").click(function(){
            $("#overlay").remove();
            $("html").removeClass("meta-show-info");        
        })
    })

    $("#comparison .comparison-button.start").click(function () {
        document.location = document.location + "?comparison=true"
    })
 }

Interface.prototype.handleToggleSimulationMode = function (handler) {
    $(document).keydown(function (e) {
        if (e.which == 66) {
            handler();
        }
    });
    $("#toggle-mode").click(function () {
        handler();
    })
}

Interface.prototype.handleResetGame = function (handler) {
    $(document).keydown(function (e) {
        if (e.which == 82) {
            handler();
        }
    });
    $("#controls .reset-game").click(function () {
        handler();
    })
}

Interface.prototype.handleResetSimulation = function (handler) {
    $(document).keydown(function (e) {
        if (e.which == 82) {
            handler();
        }
    });
    $("#controls .reset-simulation").click(function () {
        handler();
    })
}
Interface.prototype.handleRunAlgorithm = function(handler) {
    $(document).keydown(function (e) {
        if (e.which == 83) {
            handler();
        }
    });
    $("#controls .start-simulation").click(function () {
        handler();
    })
}

Interface.prototype.refreshControls = function (simulationMode) {
    $("body").removeClass("meta-show-simulation-controls");
    $("body").removeClass("meta-show-game-controls");
    if (simulationMode) {
        $("body").addClass("meta-show-simulation-controls");
    }
    else {
        $("body").addClass("meta-show-game-controls");
    }
}

Interface.prototype.addMapToSelection = function (inx, title) {
    $("#maps select").append(`<option value='${inx}'>${title}</option>`)
}

Interface.prototype.handleMapChanged = function (handler) {
    $("#maps select").change(function () {
        document.activeElement.blur()
        handler($(this).val());
    })
}

Interface.prototype.getSelectedMap = function () {
    return $("#maps select").val();
}

Interface.prototype.setSelectedMap = function(val) {
    $("#maps select").val(val);
}

Interface.prototype.getSelectedAlgorithm = function () {
    return $("#algorithms select").val();
}

Interface.prototype.setSelectedAlgorithm = function(val) {
    $("#algorithms select").val(val);
}

Interface.prototype.handleAlgorithmChanged = function(handler) {    
    $("#algorithms select").change(function () {
        document.activeElement.blur()
        handler($(this).val());
    })
}

Interface.prototype.renderBenchmarkResult = function(simulationMode, timeJS, timePHP, timeCSharp) {
    $("#controls .game-controls").addClass("finish");

    let html = "";

    if(!simulationMode) {
        html += `<div class='result'><span class='lang'>JS</span><span class='time'>${FormatMedian(timeJS)} ms</span></div>`

        let php = "";
        if(timePHP == null) {
            php = "Fehler";
        }
        else {
            php = FormatMedian(timePHP) + " ms";
        }
        
        html += `<div class='result'><span class='lang'>PHP</span><span class='time'>${php}</span></div>`

        let csharp = "";
        if(timeCSharp == null) {
            csharp = "Fehler";
        }
        else{
            csharp = FormatMedian(timeCSharp)  + " ms";
        }
        html += `<div class='result'><span class='lang'>C# WASM</span><span class='time'>${csharp}</span></div>`
    }

    $("#controls .game-controls .results").html(html);
}

function FormatMedian(input) {
    if(input == null) return "";
    if(input > 10) {
        return input.toFixed(2);
    }
    else {
        return input.toFixed(6);
    }
}

Interface.prototype.setupComparison = function(comparisonView) {
    $("body").addClass(`comparison v${comparisonView}`);
    this.comparison = true;
}

export default Interface;