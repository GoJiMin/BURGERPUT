package burgerput.project.zenput.Services.printData;

import burgerput.project.zenput.domain.*;
import burgerput.project.zenput.repository.foodRepository.CustomFoodRepository;
import burgerput.project.zenput.repository.foodRepository.FoodRepository;
import burgerput.project.zenput.repository.machineRepository.CustomMachineRepository;
import burgerput.project.zenput.repository.machineRepository.MachineRepository;
import burgerput.project.zenput.repository.mgrList.MgrListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

@RequiredArgsConstructor
@Slf4j
public class PrintDataV1 implements PrintData {

    private final MachineRepository machineRepository;
    private final CustomMachineRepository customMachineRepository;
    private final FoodRepository foodRepository;
    private final CustomFoodRepository customFoodRepository;

    private final MgrListRepository mgrListRepository;

    @Override
    public ArrayList<Map> zenputMachine() {
        //[id, JSON(MAP)] 으로 리턴

        //for saving result
        ArrayList<Map> result = new ArrayList<>();

        //Read Data from the DB(select * from machine;)
        List<Machine> machineList = machineRepository.findAll();

        List<CustomMachine> customAll = customMachineRepository.findAll();

        for (Machine macihne : machineList) {
            Map<String, String> machineMap = new LinkedHashMap<>();
            machineMap.put("id", String.valueOf(macihne.getId()));
            machineMap.put("name", macihne.getName());
            machineMap.put("min", String.valueOf(macihne.getMin()));
            machineMap.put("max", String.valueOf(macihne.getMax()));
            machineMap.put("isChecked", "false");

            for (Iterator<CustomMachine> iterator = customAll.iterator(); iterator.hasNext();) {
                int idCustom = iterator.next().getId();
                int idMachine = macihne.getId();

                log.info("idCusomt's id ={}   |  idMachine 's id ={}", idCustom, idMachine);
                if (idMachine == idCustom) {

                    machineMap.put("isChecked", "true");
                    iterator.remove();

                }
            }
            result.add(machineMap);
        }

//        List<MgrList> mgrList = mgrListRepository.findAll();
//        for (MgrList list : mgrList) {
//            Map<String, String> mgrMap = new LinkedHashMap<>();
//            mgrMap.put("id", Integer.toString(list.getId()));
//            mgrMap.put("mgrname", list.getMgrName());
//
//            result.add(mgrMap);
//        }

        return result;
    }

    @Override
    public ArrayList<Map> zenputFood() {
        //[id, JSON(MAP)] 으로 리턴

        //for Saving Result
        ArrayList<Map> result = new ArrayList<>();

        //Read Data from the DB(select * from Food;)
        List<Food> foodList = foodRepository.findAll();
        List<CustomFood> foodAll = customFoodRepository.findAll();

        for (Food food : foodList) {
            Map<String, String> foodMap = new LinkedHashMap<>();
            foodMap.put("id", String.valueOf(food.getId()));
            foodMap.put("name", food.getName());
            foodMap.put("min", String.valueOf(food.getMin()));
            foodMap.put("max", String.valueOf(food.getMax()));
            foodMap.put("isChecked", "false'");

            for (Iterator<CustomFood> iterator = foodAll.iterator(); iterator.hasNext();) {
                int idCustom = iterator.next().getId();
                int idFood = food.getId();

                if (idFood == idCustom) {
                    foodMap.put("idChecked", "true'");
                }
            }
            result.add(foodMap);
        }
//
//        List<MgrList> mgrList = mgrListRepository.findAll();
//        for (MgrList list : mgrList) {
//            Map<String, String> mgrMap = new LinkedHashMap<>();
//            mgrMap.put("id", Integer.toString(list.getId()));
//            mgrMap.put("mgrname", list.getMgrName());
//
//            result.add(mgrMap);
//        }

        return result;
    }

    @Override
    public ArrayList<Map> customMachine() {
        //for Saving Result
        ArrayList<Map> result = new ArrayList<>();

        //Get the customId
        List<CustomMachine> customId = customMachineRepository.findAll();

        for (CustomMachine customMachine : customId) {
            log.info("custommachine id ={}", customMachine.getId());
            Machine foundMachine = machineRepository.findMachineById(Integer.toString(customMachine.getId()));
            Map<String, String> customMachineMap = new LinkedHashMap<>();
            customMachineMap.put("id", Integer.toString(foundMachine.getId()));
            customMachineMap.put("name", foundMachine.getName());
            customMachineMap.put("min", String.valueOf(foundMachine.getMin()));
            customMachineMap.put("max", String.valueOf(foundMachine.getMax()));

            result.add(customMachineMap);
        }

        return result;
    }

    @Override
    public ArrayList<Map> customFood() {

        //for Saving Result
        ArrayList<Map> result = new ArrayList<>();

        //Get the customId
        List<CustomFood> customId = customFoodRepository.findAll();

        for (CustomFood customFood : customId) {
            log.info("custommachine id ={}", customFood.getId());
            Food foundFood = foodRepository.findMachineById(Integer.toString(customFood.getId()));
            Map<String, String> customFoodMap = new LinkedHashMap<>();
            customFoodMap.put("id", Integer.toString(foundFood.getId()));
            customFoodMap.put("name", foundFood.getName());
            customFoodMap.put("min", String.valueOf(foundFood.getMin()));
            customFoodMap.put("max", String.valueOf(foundFood.getMax()));

            result.add(customFoodMap);
        }

        return result;
    }

    @Override
    public ArrayList<Map> mgrList() {
        ArrayList<Map> result = new ArrayList<>();

        List<MgrList> mgrList = mgrListRepository.findAll();
        log.info("mgrList ???= {}", mgrList);
        for (MgrList list : mgrList) {
            Map<String, String> mgrListMap = new LinkedHashMap<>();
            mgrListMap.put("id", Integer.toString(list.getId()));
            mgrListMap.put("mgrname", list.getMgrName());

            result.add(mgrListMap);
        }

        return result;
    }

}
