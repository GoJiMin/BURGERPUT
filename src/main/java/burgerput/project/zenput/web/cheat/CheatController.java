package burgerput.project.zenput.web.cheat;

import burgerput.project.zenput.Services.printData.PrintData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CheatController {

    private final PrintData printData;
    @GetMapping("back/cheatFood")
    public ArrayList<Map> showCheatFood() {

        ArrayList<Map> maps = printData.customCheatFood();
        return maps;
    }

    @PostMapping("back/cheatFood")
    public void saveCheatFood() {

    }

    @GetMapping("back/cheatMachine")
    public ArrayList<Map> showCheatMachine() {

        ArrayList<Map> maps = printData.customCheatMachine();
        return maps;
    }


}
