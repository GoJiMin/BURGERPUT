package burgerput.project.zenput.web.manager.food;

import burgerput.project.zenput.Services.printData.PrintData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@RestController
public class EnterFoodController {

    private final PrintData printData;

    @GetMapping("/back/enter/foods")
    @ResponseBody
    public Map<String, ArrayList<Map>> enterFood() {
        Map<String, ArrayList<Map>> tempMap = new LinkedHashMap<>();

        ArrayList<Map> customFood = printData.customFood();

        tempMap.put("customFood", customFood);

        ArrayList<Map> mgrMap = printData.mgrList();

        tempMap.put("mgrList", mgrMap);

        return tempMap;
    }

    @PostMapping("/back/enter/foods")
    public void submitZenputFood(@RequestBody ArrayList<Map> param) {

    }
}
