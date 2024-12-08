package org.nolte.veggiebox.veggieboxserver.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Mapper {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
//        modelMapper.getConfiguration()
//                .setFieldMatchingEnabled(true)
//                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
//        modelMapper.addMappings(new PropertyMap<Customer, CustomerDto>() {
//            @Override
//            protected void configure() {
//                 map().setDeletable(source.getOrders() == null || source.getOrders().isEmpty());
//            }
//        });
        return modelMapper;
    }

}
