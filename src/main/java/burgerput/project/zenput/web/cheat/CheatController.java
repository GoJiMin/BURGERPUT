package burgerput.project.zenput.web.cheat;

import burgerput.project.zenput.Services.printData.PrintData;
import burgerput.project.zenput.Services.saveData.SaveData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@Transactional
public class CheatController {

    private final PrintData printData;
    private final SaveData saveData;

    @GetMapping("back/cheatFood")
    public ArrayList<Map> showCheatFood() {

        ArrayList<Map> maps = printData.customCheatFood();
        return maps;
    }

    @PostMapping("back/cheatFood")
    public void saveCheatFood(@RequestBody ArrayList<Map> param) {
        saveData.customCheatFoodDataSave(param);

    }

    @GetMapping("back/cheatMachine")
    public ArrayList<Map> showCheatMachine() {

        ArrayList<Map> maps = printData.customCheatMachine();
        return maps;
    }

    @PostMapping("back/cheatMachine")
    public void saveCheatMachine(@RequestBody ArrayList<Map> param) {
        saveData.customCheatMachineDataSave(param);

    }

}
